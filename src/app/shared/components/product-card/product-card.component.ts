import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FacadeService } from '@core/facade/facade.service';
import { Utils } from '@core/utils/utils';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  fav: boolean = false;
  cart: boolean = false;

  @Output() deletedItem = new EventEmitter<any>();


  @Input() image!: string;
  @Input() name!: string;
  @Input() price!: number;
  @Input() salePrice!: number;
  @Input() id!: string;
  @Input() wishList!: string;
  @Input() favouriteId!: string;
  @Input() index!: number;
  @Input() reviews!: any[];
  @Input() categoryId!: string;
  @Input() colors!: string;

  util = new Utils();

    currency: any;
    addedToFav: boolean = false;
    cartAdd!: boolean;

    viewSalPrice!: number;
    overalRationg: any;

    constructor(
      // private locatStorage: LocalStorageService,
      private facade: FacadeService

      ) {
      console.log('currency', this.facade?.getItem('currency'))
      this.currency = JSON.parse((this.facade?.getItem('currency')))[0];
    }

    ngOnInit(): void {
      console.log('color', this.colors)
    }

    addToFavorite() {
      console.log()
      if (localStorage.getItem('AUTH_TOKEN')) {
        const variables = {
          addToFavouriteInput: {
            variantId: this.id
          }
        }
        this.facade.addFavorite(variables).subscribe((res: any) => {
          console.log('data', res);
          if (res) {
            this.facade.success('Success');
            this.sendFaveItemToFaveNotification(res);
            this.addedToFav = true;
            localStorage.setItem('FAV_NOTIFICATION', JSON.parse(this.facade.getItem('FAV_NOTIFICATION')) + 1 );
          }
        }, (error: any) => {
          this.facade.handleError(error);
        });
      } else {
        localStorage.setItem('redirectTo', this.facade.url())
        this.facade.navigate(['/auth'], {
          queryParams: { subCategoryId: this.id },
        });
      }
    }

    addProduct() {
      this.cartAdd = true;
      const variables = {
        addToCartInput: {
          variantId: this.id,
          cartId: localStorage.getItem('cartId') ? localStorage.getItem('cartId') : localStorage.getItem('cartId_Guest'),
        },
      };
      this.facade.addToCart(variables).subscribe((res: any) => {
        console.log(res);
        this.cartAdd = false;
        if (res) {
          this.facade.cartOverlayToggle();
          this.facade.setItem('CART_LENGTH',res.data.addToCart.cartDetails)
          this.sendCartItemsToCartNotifications(res.data.addToCart.cartDetails);
          this.facade.success(`Added To Cart Succesfully`);
        }
      }, (error: any) => {
        console.log(error);
        this.cartAdd = false;
        this.ifNoSuchCart(error);
        // this.facade.handleError(error);

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

    deleteItemFromFave() {
      const variables = {deleteFavouriteInput: {favouriteId: this.favouriteId}}
      this.facade.deleteBuyerWithoutInputVar(variables).subscribe((res: any) => {
        if (res) {
          this.addNewItem();
          this.facade.success('Success');
          this.sendFaveItemToFaveNotification(res);
        }
      });
    }

    changeVariantBasedOnColor(variant: any) {
      console.log('variant', variant);
      this.image = variant?.variant?.frontImage;
      this.name = variant?.variant?.name;
      this.price = variant?.variant?.price;
      this.salePrice = variant?.variant?.salePrice;
      this.reviews = variant?.variant?.reviews;
      this.id = variant?.variant?.variantId;


    }

    ngOnChanges(change: SimpleChanges) {

      if(change?.reviews && change?.reviews.currentValue) {
        this.overalRationg = this.util.getOverallRating(change?.reviews.currentValue);
        console.log('overalRationg', this.overalRationg);
      }

    }

    addNewItem(index?: number) {
      console.log(this.index)
      this.deletedItem.emit(this.index);
    }


    sendFaveItemToFaveNotification(data: any) {
      this.facade.nextFave(data);
    }

    sendCartItemsToCartNotifications(res: any) {
      this.facade.nextCount(res);
    }

    gotoProductDetail() {
      console.log('gotoProductDetail')
      this.facade.navigate(['/product', this.util.createSlug(this.name , this.id) ]);
    }


    goToCategoryProduct() {
      this.facade.navigate(['/category'], { queryParams: { categoryId: this.util.createSlug(this.name, this.categoryId) } })

    }


    navigate() {
      if (this.wishList == 'wishList') {
        this.gotoProductDetail();
      } else if (this.wishList == 'category') {
          this.goToCategoryProduct();
      } else {
        this.gotoProductDetail();
      }
    }
}
