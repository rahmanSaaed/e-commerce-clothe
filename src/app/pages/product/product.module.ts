import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { SharedModule } from '@shared/shared.module';
import { ProductSliderComponent } from './components/product-slider/product-slider.component';
import { SwiperModule } from 'swiper/angular';
import { ProductReviewComponent } from './components/product-review/product-review.component';
@NgModule({
  declarations: [ProductComponent, ProductSliderComponent, ProductReviewComponent],
  imports: [CommonModule, ProductRoutingModule, SharedModule, SwiperModule],
})
export class ProductModule {}
