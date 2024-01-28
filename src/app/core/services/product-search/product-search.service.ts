import { Injectable } from '@angular/core';
import { BaseServiceService } from '@core/graph-ql/base-service/base-service.service';
import { GraphFunctionsTypesInputs } from '@core/graph-ql/graph-functions/graph-functions-types-inputs';
import { QueryFull } from '@core/models/graph-models';

@Injectable({
  providedIn: 'root',
})
export class ProductSearchService  extends GraphFunctionsTypesInputs{
  constructor(
    private baseServiceService: BaseServiceService
    ) {
    super()
  }

  // getProductsBysubCategoryId(variables) {
  //   const input = {} as QueryFull;
  //   input.func = this.FUNC_VARIANT_BY_SUB_CATEGORY;
  //   input.variable = this.INPUT_PRODUCT_BY_SUB_CATEGORY;
  //   input.type = this.TYPE_PRODUCT_BY_SUB_CATEGORY;
  //   input.paginatioin = this.INPUT_PAGINATION;
  //   input.paginatioinType = this.TYPE_PAGINATION;
  //   input.variables = variables;
  //   input.return = this.PRODUCT_LIST;
  //   return this.baseServiceService.generalQueFull(input);
  // }

  getVariantsBysubCategoryId(variables: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_VARIANT_BY_SUB_CATEGORY;
    input.variable = this.INPUT_PRODUCT_BY_SUB_CATEGORY;
    input.type = this.TYPE_PRODUCT_BY_SUB_CATEGORY;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.variables = variables;
    input.return = this.PRODUCT_LIST;
    return this.baseServiceService.generalQueFull(input);
  }




  getProductsByCategoryId(variables: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_PRODUCT_BY_CATEGORY;
    input.variable = this.INPUT_PRODUCT_BY_CATEGORY;
    input.type = this.TYPE_PRODUCT_BY_CATEGORY;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.variables = variables;
    input.return = this.PRODUCT_LIST;
    return this.baseServiceService.generalQueFull(input);
  }

  getOnSaleProducts(variables: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_PRODUCT_ON_SALE
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.variables = variables;
    input.return = this.PRODUCT_LIST;
    return this.baseServiceService.generalQueFull(input);

  }

  getProductByKey(variables: any)  {
    const input = {} as QueryFull;
    input.func = this.FUNC_PRODUCT_SEARCH;
    input.variable = this.INPUT_PRODUCT_SEARCH;
    input.type = this.TYPE_PRODUCT_SEARCH;
    input.variables = variables;
    input.return = this.SEARCH;
    return this.baseServiceService.generalQueFull(input);
  }

  searchByProductId(variables: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_SIMILAR;
    input.variable = this.INPUT_SIMILAR;
    input.type = this.TYPE_SIMILAR;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.variables = variables;
    input.return = this.PRODUCT_LIST;
    return this.baseServiceService.generalQueFull(input);
  }

  shopByGender(variables: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_PRODUCT_BY_GENDER;
    input.variable = this.INPUT_PRODUCT_BY_GENDER;
    input.type = this.TYPE_PRODUCT_BY_GENDER;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.variables = variables;
    input.return = this.PRODUCT_LIST;
    return this.baseServiceService.generalQueFull(input);
  }

  // producstByBrandId(variables) {
  //   const input = {} as QueryFull;
  //   input.func = this.FUNC_PRODUCT_BY_BRAND;
  //   input.variable = this.INPUT_PRODUCT_BY_BRAND;
  //   input.type = this.TYPE_PRODUCT_BY_BRAND;
  //   input.paginatioin = this.INPUT_PAGINATION;
  //   input.paginatioinType = this.TYPE_PAGINATION;
  //   input.variables = variables;
  //   input.return = this.PRODUCT_LIST;
  //   return this.baseServiceService.generalQueFull(input);

  // }

  // producstByAgeId(variables) {
  //   const input = {} as QueryFull;
  //   input.func = this.FUNC_PRODUCT_BY_AGE;
  //   input.variable = this.INPUT_PRODUCT_BY_AGE;
  //   input.type = this.TYPE_PRODUCT_BY_AGE;
  //   input.paginatioin = this.INPUT_PAGINATION;
  //   input.paginatioinType = this.TYPE_PAGINATION;
  //   input.variables = variables;
  //   input.return = this.PRODUCT_LIST;
  //   return this.baseServiceService.generalQueFull(input);

  // }

  filterProducts(variables: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_FILTER;
    input.variable = this.INPUT_FILTER;
    input.type = this.TYPE_FILTER;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.variables = variables;
    input.return = this.PRODUCT_LIST;
    return this.baseServiceService.generalQueFull(input);
  }

  // searchProductsIds(variables) {
  //   const input = {} as QueryFull;
  //   input.func = this.FUNC_GET_PRODUCTS_IDS;
  //   input.variable = this.INPUT_GET_PRODUCTS_IDS;
  //   input.type = this.TYPE_GET_PRODUCTS_IDS;
  //   input.variables = variables;
  //   input.return = this.PRODUCT;
  //   return this.baseServiceService.generalQueFull(input);
	// }

  searchProductWithWord(variables: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_GET_PRODUCTS_SEARCH;
    input.variable = this.INPUT_GET_PRODUCTS_SEARCH;
    input.type = this.TYPE_GET_PRODUCTS_SEARCH;
    input.variables = variables;
    input.return = this.PRODUCT_LIST;
    return this.baseServiceService.generalQueFull(input);
  }

  getAllAttributes() {
    const input = {} as QueryFull;
    input.func = this.FUNC_ATTRIBUTES;
    input.return = this.TTRIBUTES;
    return this.baseServiceService.generalQuery(input);
  }

}



