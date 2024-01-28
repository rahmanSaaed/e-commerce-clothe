import { Injectable } from '@angular/core';
import { BaseServiceService } from '@core/graph-ql/base-service/base-service.service';
import { GraphFunctionsTypesInputs } from '@core/graph-ql/graph-functions/graph-functions-types-inputs';
import { QueryFull } from '@core/models/graph-models';

@Injectable({
  providedIn: 'root'
})
export class WishListService extends GraphFunctionsTypesInputs  {

  constructor(
    private baseServiceService: BaseServiceService
  ) {
    super()
  }



  getWishList() {
    const input = {} as QueryFull;
    input.func = this.GET_FAVORITES;
    input.return = this.FAVORITES;
    return this.baseServiceService.generalQuery(input);

  }

  addFavorite(variables: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_ADD_TO_FAVORITES;
    input.variable = this.INPUT_ADD_TO_FAVORITES;
    input.type = this.TYPE_ADD_TO_FAVORITES;
    input.return = this.FAVORITES;
    input.variables = variables;
    return this.baseServiceService.generalMutationFull(input);

  }

  deleteBuyerWithoutInputVar(variables: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_DELETE_FAVE;
    input.variable = this.INPUT_DELETE_FAVE;
    input.type = this.TYPE_DELETE_FAVE;
    input.return = this.MESSAGE;
    input.variables = variables;
    return this.baseServiceService.generalMutationFull(input);
  }

}
