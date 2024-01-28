import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseServiceService } from '@core/graph-ql/base-service/base-service.service';
import { GraphFunctionsTypesInputs } from '@core/graph-ql/graph-functions/graph-functions-types-inputs';
import { QueryFull } from '@core/models/graph-models';

@Injectable({
  providedIn: 'root',
})
export class UserService extends GraphFunctionsTypesInputs {



  constructor( private route: Router,
    private baseServiceService: BaseServiceService
    ) {
    super()
  }

  register(variables: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_SIGNIN_UP
    input.return = this.BUYER_ID
    input.type = this.TYPE_SIGNIN_UP;
    input.variable = this.INPUT_SIGNIN_UP;
    input.variables = variables;
    return this.baseServiceService.generalMutationFull(input);
  }

  login(variables: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_SIGNIN;
    input.return = this.TOKEN;
    input.type = this.TYPE_SIGNIN;
    input.variable = this.INPUT_SIGNIN;
    input.variables = variables;
    return  this.baseServiceService.generalMutationFull(input);

  }

  forgetPassword(variables: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_FORGET_PASS;
    input.return = this.MESSAGE;
    input.type = this.TYPE_FORGET_PASS;
    input.variable = this.INPUT_FORGET_PASS;
    input.variables = variables;
    return this.baseServiceService.generalMutationFull(input);
  }

  resetPassword(variables: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_RESET_PASS;
    input.return = this.MESSAGE;
    input.type = this.TYPE_RESET_PASS;
    input.variable = this.INPUT_RESET_PASS;
    input.variables = variables;
    return this.baseServiceService.generalMutationFull(input);
  }

  activateUser(variables: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_ACTIVATE_BUYER;
    input.return = this.MESSAGE;
    input.type = this.TYPE_ACTIVATE_BUYER;
    input.variable = this.INPUT_ACTIVATE_BUYER;
    input.variables = variables;
    return this.baseServiceService.generalMutationFull(input);
  }

  activateChangeEmail(variables: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_CHANGE_EMAIL;
    input.return = this.MESSAGE;
    input.type = this.TYPE_CHANGE_EMAIL;
    input.variable = this.INPUT_CHANGE_EMAIL;
    input.variables = variables;
    return this.baseServiceService.generalMutationFull(input);
  }

  resendActivationMail(variables: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_RESEND_ACTIVATION;
    input.return = this.MESSAGE;
    input.type = this.TYPE_RESEND_ACTIVATION;
    input.variable = this.INPUT_RESEND_ACTIVATION;
    input.variables = variables;
    return this.baseServiceService.generalMutationFull(input);

  }


  validateLoginToken() {
    const input = {} as QueryFull;
    input.func = this.FUNC_VALIDATE_TOKEN;
    input.return = this.MESSAGE;
    return this.baseServiceService.generalMutation(input);
  }


  validateBuyer(variables: any) {
    const input = {} as QueryFull;
    input.func = this.FUNC_VALIDATE_BUYER;
    input.return = this.MESSAGE;
    input.type = this.TYPE_VALIDATE_BUYER;
    input.variable = this.INPUT_VALIDATE_BUYER;
    input.variables = variables;
    return this.baseServiceService.generalMutationFull(input);
  }

  logOut() {
    localStorage.clear();
    this.route.navigate(['/']);
  }
}
