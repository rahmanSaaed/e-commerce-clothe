import { Injectable } from '@angular/core';
import { BaseServiceService } from '@core/graph-ql/base-service/base-service.service';
import { GraphFunctionsTypesInputs } from '@core/graph-ql/graph-functions/graph-functions-types-inputs';
import { QueryFull } from '@core/models/graph-models';

@Injectable({
  providedIn: 'root'
})
export class BlogsService extends GraphFunctionsTypesInputs{

  constructor(
    private baseServiceService: BaseServiceService

    ) {
      super()
     }


  getBlogs(variables?: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_BLOGS;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.return = this.BLOGS;
    input.variables = variables;
    return this.baseServiceService.generalQueFull(input);
  }


  getBlog(variables?: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_BLOG;
    input.variable = this.INPUT_BLOG;
    input.type = this.TYPE_BLOG;
    input.return = this.BLOG;
    input.variables = variables;
    return this.baseServiceService.generalQueFull(input);
  }

  relatedBlogs(variables?: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_RELATED_BLOGS;
    input.type = this.TYPE_RELATED_BLOGS;
    input.return = this.BLOGS;
    input.variables = variables;
    input.variable = this.INPUT_RELATED_BLOGS;

    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;

    return this.baseServiceService.generalQueFull(input);
  }

  getSitting() {
    const input = {} as QueryFull;
    input.func = this.FUNC_SETTING;
    input.return = this.SETTING;
    return this.baseServiceService.generalQuery(input);
  }

}
