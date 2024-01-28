import { Injectable } from '@angular/core';
import { BaseServiceService } from '@core/graph-ql/base-service/base-service.service';
import { GraphFunctionsTypesInputs } from '@core/graph-ql/graph-functions/graph-functions-types-inputs';
import { QueryFull } from '@core/models/graph-models';

@Injectable({
  providedIn: 'root',
})
export class CartService extends GraphFunctionsTypesInputs{
  overlay: boolean = false;
  total!: number;
  tax!: number;
  shipping!: number;
  constructor(
    private baseServiceService: BaseServiceService
    ) {
    super()
  }
  cartOverlayToggle(){
    console.log('cartOverlayToggle')
    this.overlay = !this.overlay
  }
  creteCart() {
    const input = {} as QueryFull;
    input.func = this.FUNC_CREATE_CART;
    input.return = this.CART_ID;
    return this.baseServiceService.generalMutation(input);
  }

  addToCart(variables?: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_ADD_TO_CART;
    input.variable = this.INPUT_ADD_TO_CART;
    input.type = this.TYPE_ADD_TO_CART;
    input.return = this.ADD_TO_CART;
    input.variables = variables;
    return this.baseServiceService.generalMutationFull(input);
  }

  getCart(variables?: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_GET_CART;
    input.variable = this.INPUT_GET_CART;
    input.type = this.TYPE_GET_CART;
    input.return = this.GET_CART;
    input.variables = variables;
    return this.baseServiceService.generalQueFull(input);
  }

  deleteProductFromCart(variables?: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_DELETE_PRODUCT_CART;
    input.variable = this.INPUT_DELETE_PRODUCT_CART;
    input.type = this.TYPE_DELETE_PRODUCT_CART;
    input.return = this.MESSAGE;
    input.variables = variables;
    return this.baseServiceService.generalMutationFull(input);
  }


  getCartByer() {
    const input = {} as QueryFull;
    input.func = this.FUNC_BUYER_CART;
    input.return = this.GET_CART;
    return this.baseServiceService.generalQuery(input);
  }

  getCurencies() {
    const input = {} as QueryFull;
    input.func = this.FUNC_CURENCIES;
    input.return = this.CURENCIES;
    return this.baseServiceService.generalQuery(input);
  }

  validateCode(variables?: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_VALIDATE_PROMO_CODE;
    input.variable = this.INPUT_VALIDATE_PROMO_CODE;
    input.type = this.TYPE_VALIDATE_PROMO_CODE;
    input.return = this.PROMO_CODE;
    input.variables = variables;
    return this.baseServiceService.generalQueFull(input);
  }

  updateProductCartQuantity(variables?: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_UPDATE_CART;
    input.variable = this.INPUT_UPDATE_CART;
    input.type = this.TYPE_UPDATE_CART;
    input.return = this.UPDATE_CART;
    input.variables = variables;
    return this.baseServiceService.generalMutationFull(input);
  }

  cartShippingFees(variables?: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_CART_FEES;
    input.variable = this.INPUT_CART_FEES;
    input.type = this.TYPE_CART_FEES;
    input.return = this.SHIPPING_FEES;
    input.variables = variables;
    return this.baseServiceService.generalQueFull(input);
  }

  crossSelling(variables?: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_CROSS_SELLING;
    input.variable = this.INPUT_CROSS_SELLING;
    input.type = this.TYPE_CROSS_SELLING;
    input.return = this.CROSS_SELLING;
    input.variables = variables;
    return this.baseServiceService.generalQueFull(input);
  }

  countTotal(cartDetail: any) {
    console.log('countTotalcartDetail', cartDetail)
    this.total = 0;
    cartDetail.forEach((el: any) => {
      if (el?.variant?.salePrice) {
        this.total = (el?.variant?.salePrice * JSON.parse(el?.qty)) + this.total;
      } else {
        this.total = (el.variant?.price * JSON.parse(el?.qty)) + this.total;
      }
    });
    console.log('countTotal', this.total);

    return this.total ? this.total : 0 ;
  }

  countVat(cartDetail: any) {
    this.tax = 0;
    cartDetail.forEach((el: any) => {
      if (el?.variant?.tax) {
        this.tax = (el?.variant?.tax * JSON.parse(el?.qty)) + this.tax;
      }
    });
    console.log('tax', this.tax);

    return this.tax ? this.tax : 0;
  }

  shippingAmmount(cartDetail: any) {
    this.shipping = 0;
    cartDetail.forEach((el: any) => {
      if (el?.variant?.freeShipping != 1) {
        this.shipping = this.shipping + (el?.variant?.shippingFees * JSON.parse(el?.qty) );
      }
    });
    console.log('shipping', this.shipping);

    return this.shipping;
  }


  createCart() {
    return new Promise((resolve, reject) => {
    if (localStorage.getItem('cartId')) {
      resolve(localStorage.getItem('cartId'));
    } else {
      this.creteCart().subscribe((res: any) => {
        if (localStorage.getItem('AUTH_TOKEN')) {
          localStorage.setItem('cartId', res.data.createCart.cartId);
        }  else {
          localStorage.setItem('cartId_Guest', res.data.createCart.cartId);
        }
         resolve(res.data.createCart.cartId);
      });
    }
  }
  )}
}
// (click)="cartService.cartOverlayToggle()"
