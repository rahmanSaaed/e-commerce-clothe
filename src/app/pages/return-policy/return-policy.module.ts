import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReturnPolicyRoutingModule } from './return-policy-routing.module';
import { ReturnPolicyComponent } from './return-policy.component';
import { HandleErrorsService } from '@core/services/handle-errors/handle-errors.service';


@NgModule({
  declarations: [
    ReturnPolicyComponent
  ],
  imports: [
    CommonModule,
    ReturnPolicyRoutingModule
  ],
  providers: [HandleErrorsService]
})
export class ReturnPolicyModule { }
