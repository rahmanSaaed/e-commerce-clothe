import { Injectable } from '@angular/core';
import { BaseServiceService } from '@core/graph-ql/base-service/base-service.service';
import { GraphFunctionsTypesInputs } from '@core/graph-ql/graph-functions/graph-functions-types-inputs';
import { QueryFull } from '@core/models/graph-models';


@Injectable({
	providedIn: 'root'
})
export class ProductsService  extends GraphFunctionsTypesInputs {

	constructor(
    private baseServiceService: BaseServiceService

	) {
    super()
  }


	getProductDetail(variables: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_PRODUCT_DETAIL;
    input.variable = this.INPUT_PRODUCT_DETAIL;
    input.type = this.TYPE_PRODUCT_DETAIL;
    input.return = this.PRODUCT_DETAIL;
    input.variables = variables;
    return this.baseServiceService.generalQueFull(input);
	}

	getProductRelated(variables: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_RELATED;
    input.variable = this.INPUT_PRODUCT_BY_SUB_CATEGORY;
    input.type = this.TYPE_PRODUCT_BY_SUB_CATEGORY;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.return = this.RELATED;
    input.variables = variables;
    return this.baseServiceService.generalQueFull(input);
	}

	getProductReviews(variables: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_PRODUCT_REVIEW;
    input.variable = this.INPUT_PRODUCT_REVIEW;
    input.type = this.TYPE_PRODUCT_RELATED;
    input.return = this.PRODUCT_REVIEWS;
    input.variables = variables;
    return this.baseServiceService.generalQueFull(input);
  }

  getVariantByAttributeValue(variables: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_VARIANT_BY_ATTRIBUTE;
    input.variable = this.INPUT_VARIANT_BY_ATTRIBUTE;
    input.type = this.TYPE_VARIANT_BY_ATTRIBUTE;
    input.return = this.PRODUCT_DETAIL;
    input.variables = variables;
    return this.baseServiceService.generalQueFull(input);
	}

}
