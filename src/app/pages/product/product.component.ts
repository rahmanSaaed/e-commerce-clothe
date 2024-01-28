import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacadeService } from '@core/facade/facade.service';
import { Utils } from '@core/utils/utils';
import SwiperCore, { Navigation } from 'swiper/core';
SwiperCore.use([Navigation]);

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  productsSliderConfig: any = {
    spaceBetween: 20,
    slidesPerView: 1,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  };
  @ViewChild('contentScroll') content!: ElementRef;


	url!: string;
	productDetail: any;
	activeImage!: string;
	category: any;
	subCategory: any;
	addedToFav: boolean = false;
	addedToCart: boolean = false;
  util = new Utils();


	related: any;
	crossSelling: any[] = [];
	productReviews: any[] = [];
	overallRatingValue: any;
	customerReviews: any = {
		'0':0,
		'1':0,
		'2':0,
		'3':0,
		'4':0,
		'5':0
	}
  currency: any;
  cartAdd!: boolean;
  subCategories: any;
  subCategoryId: any;
  categoryId: any;
  attributes: any[] = [];
  cloneAttributeId: any[] = [];
  isGettingData!: boolean;
  clickedAttribute!: { attributeId: any; valueId: any; };
  sliderImages!: any[];

	constructor(
    private facade: FacadeService,
    private router: ActivatedRoute

	) {
    this.currency = JSON.parse((this.facade.getItem('currency'))) ? JSON.parse((this.facade.getItem('currency')))[0] : undefined;
    // this.switchLang(this.facade.getItem('lang') ? this.facade.getItem('lang') : 'en');
  }

	ngOnInit(): void {
		this.getQueryParam();
		console.log('am here')
	}

	getQueryParam() {
		this.router.paramMap.subscribe((params) => {
      let id = params.get('id');

      console.log('productDetailsId', id);
      console.log(this.util.unSlug(id));

			if (id) {
				this.getProductDetails(this.util.unSlug(id));
			}
		});
	}


	getProductDetails(id: any) {
    this.isGettingData = true;
    const variables = {
      getVariantInput: {
        variantId: id
      }
    }
		 this.facade
			.getProductDetail(variables)
			.subscribe((res: any) => {
        console.log('getProductDetails', res)
				if (res.data) {
          this.afterGetVariant(res?.data?.variant);
          this.isGettingData = false;
				}
			}, error => {
        this.productDetail = undefined;
        this.isGettingData = false;
      });
	}


  afterGetVariant(drodct: any) {
    this.sliderImages = []
    this.productDetail = drodct;
    console.log('productDetail', this.productDetail);
    this.subCategoryId = this.productDetail?.subcategoryId;
    this.categoryId = this.productDetail?.categoryId;
    this.overallRatingValue = this.util.getOverallRating(this.productDetail?.reviews);
    this.sliderImages = [this.productDetail?.frontImage,...this.productDetail?.images]
    console.log('overallRatingValue', this.overallRatingValue);
    this.sellectedAttributes();
    this.relatedProducts(this.subCategoryId)
  }


  sellectedAttributes() {
    this.productDetail?.productAttributesValues.forEach((Attributes: any) => {
      this.productDetail?.attributes.map((sellectedAttr: any) => {
        if (Attributes?.attributeId == sellectedAttr?.attributeId) {
          console.log(Attributes?.attributeId)
          Attributes.defaultAttrId = sellectedAttr?.valueId;
        }
      });
      this.attributes = this.productDetail?.attributes;
    });
    console.log('newProduct', this.productDetail);
  }

  getVariantByAttributes(cloneAttributeId: any) {
    this.isGettingData = true;
    // this.productDetail = undefined;
    console.log('getVariantByAttributes');
		const variables = {
      getVariantByClickedAttributeValuesInput: {
        attributeValues: [...cloneAttributeId], productId: this.productDetail?.productId,
        clickedAttributeValue: this.clickedAttribute},
    		};
    console.log('getVariantByAttributes', variables)
		this.facade.getVariantByAttributeValue(variables).subscribe((res: any) => {
       this.productDetail = undefined;
      this.isGettingData = false;
			console.log('getVariantByAttributes', res);
			if (res.data) {
        this.afterGetVariant(res?.data?.variantByClickedAttributeValues);
			}
		}, (errr: any) => {
      this.isGettingData = false;
    });
  }

  changeVariant(attribute: any, attributeValueId: any) {
    console.log('attributeValueId', attribute, attributeValueId, )
    console.log('attributes', this.attributes)
    this.cloneAttributeId = []
    this.clickedAttribute = {
      attributeId: attribute,
      valueId: attributeValueId
    }
    this.attributes.map(el => {
      if (el?.attributeId == attribute) {
        el.valueId = attributeValueId;
      }

      const attr = {
        attributeId: el?.attributeId,
        valueId: el.valueId
      }

      this.cloneAttributeId.push(attr)
    })

    console.log('this.cloneAttributeId', this.cloneAttributeId)
    this.getVariantByAttributes(this.cloneAttributeId);
  }



	addProductToCart() {
		if (localStorage.getItem('cartId') || localStorage.getItem('cartId_Guest')) {
			this.addProduct();
		} else {
			this.facade.createCart().then((res: any) => {
				console.log(res);
				this.addProduct();
			});
		}
	}

	addProduct() {
    this.cartAdd = true;
		const variables = {
			addToCartInput: {
				variantId: this.productDetail.variantId,
				cartId: localStorage.getItem('cartId') ? localStorage.getItem('cartId') : localStorage.getItem('cartId_Guest'),
			},
		};
		this.facade.addToCart(variables).subscribe((res: any) => {
      console.log(res);
      this.cartAdd = false;
			if (res) {
        this.facade.cartOverlayToggle();
        this.sendCartItemsToCartNotifications(res.data.addToCart.cartDetails);
        this.facade.success(`Added To Cart Succesfully`);
			}
		}, (error: any) => {
      this.cartAdd = false;
      this.ifNoSuchCart(error)
    });
  }

  ifNoSuchCart(error: any) {
    console.log(error?.graphQLErrors[0]?.extensions?.response?.statusCode == 404);
    if (error?.graphQLErrors[0]?.extensions?.response?.statusCode == 404) {
      localStorage.removeItem('cartId');
      localStorage.removeItem('cartId_Guest');
      this.facade.createCart().then((res: any) => {
        if (res) {
          this.addProduct();
        }
      })
    }
  }

	addToFavorite() {
		if (localStorage.getItem('AUTH_TOKEN')) {

      const variables = {
        addToFavouriteInput: {
          variantId: this.productDetail.variantId
        }
      }

			this.facade.addFavorite(variables).subscribe((res: any) => {
				console.log('data', res);
				if (res) {
					this.facade.success('Success');
					this.sendFaveItemToFaveNotification(res);
					this.addedToFav = true;
					this.facade.setItem(
						'FAV_NOTIFICATION',
						JSON.parse(this.facade.getItem('FAV_NOTIFICATION')) + 1
					);
				}
			}, (error: any) => {
        this.facade.info(error)
      });
		} else {
      this.facade.setItem('redirectTo', this.facade.url());
			this.facade.navigate(['/auth']);
		}
  }

  relatedProducts(subCategoryId: any) {
    console.log('relatedProducts', subCategoryId);
		const variables = {
      getProductBySubcategoryInput: {subCategoryId: subCategoryId},
			paginationOptions: {  },
		};
    console.log('relatedProductsVariables', variables)
		this.facade.getProductRelated(variables).subscribe((res: any) => {
			console.log('relatedProducts', res);
			if (res.data) {
				this.related = res.data.related;
			}
		});
	}

	sendFaveItemToFaveNotification(data: any) {
		this.facade.nextFave(data);
	}

	sendCartItemsToCartNotifications(res: any) {
		this.facade.nextCount(res);
	}









  switchLang(lang: string) {
    this.facade.use(lang);
  }

}
