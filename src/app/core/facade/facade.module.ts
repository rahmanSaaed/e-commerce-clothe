import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacadeService } from './facade.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    FormsModule,
    ReactiveFormsModule,
    FacadeService]
})
export class FacadeModule { }
