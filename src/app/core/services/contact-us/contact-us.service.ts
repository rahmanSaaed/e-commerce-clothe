import { Injectable } from '@angular/core';
import { BaseServiceService } from '@core/graph-ql/base-service/base-service.service';
import { GraphFunctionsTypesInputs } from '@core/graph-ql/graph-functions/graph-functions-types-inputs';
import { QueryFull } from '@core/models/graph-models';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService extends GraphFunctionsTypesInputs{

  constructor(
    private baseServiceService: BaseServiceService
    ) {
      super()
   }

  createContact(variables?: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_CREATE_CONTACT
    input.return = this.MESSAGE
    input.type = this.TYPE_CREATE_CONTACT;
    input.variable = this.INPUT_CREATE_CONTACT;
    input.variables = variables;
    return this.baseServiceService.generalMutationFull(input);

  }



}
