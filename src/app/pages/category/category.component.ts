import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { Utils } from '@core/utils/utils';
import { FacadeService } from '@core/facade/facade.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  value: number = 100;
  options: Options = {
    floor: 0,
    ceil: 200,
  };
  @ViewChildren('checkboxes') checkboxes!: QueryList<ElementRef>;

  PriceValue: number = 0;
  highValue: number = 1000;

  page: number = 1;
  limit: number = 10;

  products: any[] = [];
  category: any;
  subCategories: any;
  subCategoryId!: string;
  util = new Utils();

  filterSubCategoryForm: FormGroup;
  newProductsFiltered: any[] = [];
  cloneProducts!: any[];
  fromPriceFilter: any;
  toPriceFilter: any;
  subCategoriesIds: any[] = [];
  saleIds: any[] = [];
  filterIdsParam: any[] = [];
  categoryId!: String;
  showFilterMenue: boolean = false;
  parameter: any;
  sale!: boolean;
  toggleMenu: any = {
    subCategory: false,
    brand: false,
    sale: false,
    price: false,
  };
  isSubmiting!: boolean;
  allAttributes: any;
  attributes: any[] = [];
  constructor(private facade: FacadeService) {
    this.filterSubCategoryForm = this.facade.fb({
      checkArray: this.facade.array(),
    });

    // this.switchLang(this.facade.getItem('lang') ? this.facade.getItem('lang') : 'en');
  }

  ngOnInit(): void {
    console.log('snapshot.url', this.facade.snapshot());
    this.getQueries();
    // this.getAttributes();
  }

  onCheckboxChange(e?: any, type?: any) {
    const checkArray: FormArray = this.filterSubCategoryForm.get(
      'checkArray'
    ) as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
      this.manipulateteIdsAddd(e.target.value, type);
    } else {
      this.manipulateteIdsRemove(e.target.value, type);
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          if (checkArray?.length == 0) {
            this.clearQueryParam();
          }
          return;
        }
        i++;
      });
    }
  }

  checkedEvnt() {
    if (this.checkboxes) {
      this.checkboxes.forEach((element) => {
        element.nativeElement.checked = false;
      });
    }
  }

  manipulateteIdsAddd(id?: any, type?: any) {
    this.filterIdsParam = [];
    if (type == 'subCategories') {
      this.subCategoriesIds.push(id);
    } else if (type == 'sale') {
      this.sale = true;
      this.saleIds.push(id);
    }

    console.log('subCategoriesIds', this.subCategoriesIds);
    const idesParsm = this.formationOfFilterObjectOfArray();
    console.log('idesParsm', idesParsm);
    this.filterIdsParam.push(idesParsm);
    this.submitFilterSubCategoryForm();
  }

  manipulateteIdsRemove(id: any, type: any) {
    this.filterIdsParam = [];

    if (type == 'subCategories') {
      const index = this.subCategoriesIds.indexOf(id);
      this.subCategoriesIds.splice(index, 1);
    } else if (type == 'sale') {
      const index = this.saleIds.indexOf(id);
      this.saleIds.splice(index, 1);
    }

    const idesParsm = this.formationOfFilterObjectOfArray();
    console.log('manipulateteIdsRemove', idesParsm);
    this.filterIdsParam.push(idesParsm);

    if (Object.keys(this.filterIdsParam[0]).length === 0) {
      this.clearQueryParam();
    }

    this.submitFilterSubCategoryForm();
  }

  formationOfFilterObjectOfArray() {
    console.log(this.fromPriceFilter, this.toPriceFilter);
    console.log('attributes', this.attributes);
    this.filterIdsParam = [];
    this.parameter = {
      categoryId: this.categoryId,
      subcategoryId: this.subCategoriesIds,
      attributeValues: this.attributes,
      sale: this.saleIds.length > 0 ? '1' : [],
      minPrice: this.fromPriceFilter,
      maxPrice: this.toPriceFilter,
    };

    console.log('formationOfFilterObjectOfArray', this.parameter);

    for (let key of Object.keys(this.parameter)) {
      if (this.parameter[key]?.length > 0) {
      } else if (key != 'minPrice' && key != 'maxPrice') {
        delete this.parameter[key];
      }
    }
    console.log(this.parameter);

    if (this.parameter?.sale == '1') {
      this.parameter.sale = true;
    }

    return this.parameter;
  }

  getAttributes() {
    this.facade.getAllAttributes().subscribe(
      (res: any) => {
        this.allAttributes = res?.data?.attributes;
        console.log('getAttributes', this.allAttributes);
      },
      (error) => {}
    );
  }

  formattingAttributes(attributeId: any, attributeValueId: any) {
    const attr = {
      attributeId: attributeId,
      valueId: attributeValueId,
    };
    const indexAttr = this.attributes.findIndex(
      (el) => el?.valueId == attributeValueId
    );
    if (indexAttr == -1) {
      this.attributes.push(attr);
    } else {
      this.attributes.splice(indexAttr, 1);
    }
    const idesParsm = this.formationOfFilterObjectOfArray();
    this.filterIdsParam.push(idesParsm);
    this.submitFilterSubCategoryForm();
  }

  submitFilterSubCategoryForm() {
    this.isSubmiting = true;
    this.limit = this.limit;
    const variables = {
      filterProductInput: this.filterIdsParam[0] ? this.filterIdsParam[0] : [],
      paginationOptions: {
        page: this.page,
        limit: this.limit,
      },
    };
    this.facade.filterProducts(variables).subscribe(
      (res: any) => {
        this.isSubmiting = false;
        if (res?.data?.filterVariant?.length > 0) {
          this.products = [...res?.data?.filterVariant];
        } else if (res?.data?.filterVariant?.length == 0) {
          this.products = [];
        }
      },
      (err) => {
        this.products = [];
        this.isSubmiting = false;
      }
    );
  }

  price(event: any) {
    this.filterIdsParam = [];
    this.toPriceFilter = event.highValue;
    this.fromPriceFilter = event.value;
    // this.filterProductsBySubCategory();
    console.log(this.fromPriceFilter, this.toPriceFilter);
    const idesParsm = this.formationOfFilterObjectOfArray();
    console.log('idesParsm', idesParsm);
    console.log('filterIdsParam', this.filterIdsParam);

    this.filterIdsParam.push(idesParsm);
    console.log('filterIdsParam', this.filterIdsParam);

    this.submitFilterSubCategoryForm();
    console.log('price', event);
  }

  getQueries() {
    this.facade.queryParams().subscribe((params: any) => {
      this.filterSubCategoryForm.reset('');
      this.checkedEvnt();
      if (params['subCategoryId']) {
        this.subCategories = undefined;
        this.subCategoryId = this.util.unSlug(params['subCategoryId']);
        this.getProductsBysubCategoryIdFunc(this.subCategoryId);
      } else if (params['categoryId']) {
        this.categoryId = this.util.unSlug(params['categoryId']);
        this.getProductsByCategoryIdFunc(this.categoryId);
        this.getSubCategoriesByCategoryId(this.categoryId);
      } else if (
        this.facade.snapshotPth()?.includes('sale') &&
        this.subCategoriesIds?.length == 0
      ) {
        this.manipulateteIdsAddd(1, 'sale');
      } else if (params['key']) {
        this.searchByKey(params['key']);
      } else if (params['product']) {
        this.searchWithWord(params['product']);
      } else {
        this.submitFilterSubCategoryForm();
      }
    });
  }

  paginateProducts() {
    this.facade.queryParams().subscribe((params: any) => {
      if (params['subCategoryId']) {
        this.getProductsBysubCategoryIdFunc(
          this.util.unSlug(params['subCategoryId'])
        );
      } else if (params['categoryId']) {
        this.categoryId = this.util.unSlug(params['categoryId']);
        this.getProductsByCategoryIdFunc(this.categoryId);
      } else if (
        this.facade.snapshotPth().includes('sale') &&
        this.subCategoriesIds?.length == 0
      ) {
        this.manipulateteIdsAddd(1, 'sale');
      } else if (params['key']) {
        this.searchByKey(params['key']);
      } else if (params['product']) {
        this.searchWithWord(params['product']);
      } else {
        this.submitFilterSubCategoryForm();
      }
    });
  }

  getProductsBysubCategoryIdFunc(id: any) {
    const variables = {
      getVariantBySubcategory: {
        subcategoryId: id,
      },
      paginationOptions: {
        limit: this.limit,
        page: this.page,
      },
    };
    this.isSubmiting = true;
    this.facade.getVariantsBysubCategoryId(variables).subscribe(
      (res: any) => {
        console.log('getProductsBysubCategoryIdFunc', res);
        this.products = [...res?.data?.variantsBySubcategoryId];
        this.cloneProducts = [...this.products];
        this.isSubmiting = false;
      },
      (error) => {
        this.products = [];
        this.isSubmiting = false;
      }
    );
  }

  getProductsByCategoryIdFunc(id: any) {
    this.isSubmiting = true;
    const variables = {
      getVariantByCategoryId: {
        categoryId: id,
      },
      paginationOptions: {
        page: this.page,
        limit: this.limit,
      },
    };
    this.facade.getProductsByCategoryId(variables).subscribe(
      (res: any) => {
        this.isSubmiting = false;
        this.products = res.data.variantsByCategoryId;
        this.cloneProducts = [...this.products];
        console.log('products', this.products);
      },
      (error) => {
        this.products = [];
        this.isSubmiting = false;
      }
    );
  }

  searchWithWord(searchWord: any) {
    this.isSubmiting = true;
    const variables = {
      searchProduct: {
        keyword: searchWord,
      },
    };
    this.facade.searchProductWithWord(variables).subscribe(
      (res: any) => {
        this.products = res?.data?.productSearch;
        this.cloneProducts = [...this.products];
        this.isSubmiting = false;
      },
      (error) => {
        this.products = [];
        this.isSubmiting = false;
      }
    );
  }

  getSubCategoriesByCategoryId(id: any) {
    const variables = {
      getSubcategoryByCategoryInput: {
        categoryId: id,
      },
    };
    this.facade.getSubCategoryByCategoryId(variables).subscribe(
      (res: any) => {
        this.subCategories = res.data.subCategoryByCategoryId;
      },
      (error: any) => {}
    );
  }

  onScroll() {
    if (this.products?.length > 0) {
      this.limit = this.limit + 10;
      this.paginateProducts();
    }
  }

  searchByKey(id: any) {
    this.isSubmiting = true;
    const variables = {
      paginationOptions: {
        page: this.page,
        limit: this.limit,
      },
      similarProductInput: {
        productId: id,
      },
    };
    this.facade.searchByProductId(variables).subscribe(
      (res: any) => {
        this.isSubmiting = false;
        if (res.data.similarProducts) {
          this.products = res.data.similarProducts;
        }
      },
      (err) => {
        this.products = [];
        this.isSubmiting = false;
      }
    );
  }

  switchLang(lang: string) {
    this.facade.use(lang);
  }

  clearQueryParam() {
    let snapshot = this.facade?.snapshot();
    if (
      snapshot?.queryParams?.categoryId ||
      snapshot?.queryParams?.subCategoryId
    ) {
    } else {
      this.facade.navigate([], { queryParams: {} });
    }
  }

  emitedAttributes(category: any) {
    console.log('emitedAttributes', category);
    if (category != 'AllAttr') {
      this.allAttributes = [...category?.attributes];
    } else {
      this.getAttributes();
    }
  }
}
