import { Injectable } from '@angular/core';
import { BaseServiceService } from '@core/graph-ql/base-service/base-service.service';
import { GraphFunctionsTypesInputs } from '@core/graph-ql/graph-functions/graph-functions-types-inputs';
import { QueryFull } from '@core/models/graph-models';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService extends GraphFunctionsTypesInputs {

  constructor(
    private baseServiceService: BaseServiceService
    ) {
    super()

  }



  aboutUs() {
    const input = {} as QueryFull;
    input.func = this.FUNC_ABOUT;
    input.return = this.ABOUT;
    return this.baseServiceService.generalQuery(input);
  }

}

