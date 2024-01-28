import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ConfirmRegisterationComponent } from './confirm-registeration/confirm-registeration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HandleErrorsService } from '@core/services/handle-errors/handle-errors.service';
import { ActivationComponent } from './activation/activation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ConfirmRegisterationComponent,
    ActivationComponent,
    ResetPasswordComponent,

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    HandleErrorsService
  ]
})
export class AuthModule { }
