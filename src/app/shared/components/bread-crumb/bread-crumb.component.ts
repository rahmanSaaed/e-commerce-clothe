import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FacadeService } from '@core/facade/facade.service';
import { Utils } from '@core/utils/utils';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss'],
})
export class BreadCrumbComponent implements OnInit, OnChanges {
  @Input() subCategoryId!: string;
  @Input() categoryId!: any;
  @Output() attributesValue = new EventEmitter<any>();
  // @Output() shippingFee = new EventEmitter<any>();

  util = new Utils();
  category: any;
  subCategory: any;
  isGettingCatName!: boolean;

  constructor(private facade: FacadeService) {}

  ngOnInit(): void {}

  goToCategoryProduct() {
    this.facade.navigate(['/category'], {
      queryParams: { categoryId: this.categoryId },
    });
  }

  goToSubCategoriesProducts() {
    this.facade.navigate(['/category'], {
      queryParams: { subCategoryId: this.subCategoryId },
    });
  }

  getCategory(id: any) {
    this.isGettingCatName = true;
    const variables = {
      getCategoryInput: {
        categoryId: id,
      },
    };
    this.facade.getCategoryById(variables).subscribe(
      (res: any) => {
        this.category = res?.data?.category;
        this.isGettingCatName = false;
        this.emmitAttributes(this.category);
        console.log('getCategoryName', this.category);
      },
      (error: any) => {}
    );
  }

  getSubCategoryName(id: any) {
    console.log('getSubCategoryName');
    const variables = {
      getSubcategoryInput: {
        subcategoryId: id,
      },
    };
    this.facade
      .getSubCategoryBySubCategoryId(variables)
      .subscribe((res: any) => {
        this.subCategory = res?.data?.subCategory;
        this.categoryId = res?.data?.subCategory?.categoryId;
        this.getCategory(res?.data?.subCategory?.categoryId);
        console.log('getSubCategoryName', this.subCategory);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes);
    if (changes?.categoryId?.currentValue) {
      this.getCategory(this.categoryId);
    } else console.log('ngOnChanges', changes?.subCategoryId?.currentValue);
    if (changes?.subCategoryId?.currentValue) {
      this.getSubCategoryName(this.subCategoryId);
    } else {
      this.emmitAttributes('AllAttr');
    }
  }

  emmitAttributes(category: any) {
    console.log('category', category);
    this.attributesValue.emit(category);
  }
}
