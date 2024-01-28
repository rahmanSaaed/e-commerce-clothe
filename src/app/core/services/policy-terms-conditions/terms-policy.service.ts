import { Injectable } from '@angular/core';
import { BaseServiceService } from '@core/graph-ql/base-service/base-service.service';
import { GraphFunctionsTypesInputs } from '@core/graph-ql/graph-functions/graph-functions-types-inputs';
import { QueryFull } from '@core/models/graph-models';

@Injectable({
  providedIn: 'root'
})
export class TermsPolicyService  extends GraphFunctionsTypesInputs{

  constructor(
    private baseServiceService: BaseServiceService,
 ) {
      super()
    }

  getSitting() {
    const input = {} as QueryFull;
    input.func = this.FUNC_SETTING;
    input.return = this.SITTINGS_POLICY;
    return this.baseServiceService.generalQuery(input);
  }


  getTermsAndConditions(variables: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_TERMS_CONDITIONS;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.return = this.TERMS_CONDITIONS;
    input.variables = variables;
    return this.baseServiceService.generalQueFull(input);

  }

}
