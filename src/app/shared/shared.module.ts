import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ImageComponent } from '@shared/components/image/image.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { StarRateComponent } from './components/star-rate/star-rate.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { RouterModule } from '@angular/router';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';

@NgModule({
  declarations: [
    ImageComponent,
    StarRateComponent,
    ProductCardComponent,
    CategoryCardComponent,
    PlaceholderComponent,
    BreadCrumbComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    LazyLoadImageModule,
    RouterModule,
  ],
  exports: [
    HttpClientModule,
    AngularSvgIconModule,
    ImageComponent,
    StarRateComponent,
    ProductCardComponent,
    CategoryCardComponent,
    PlaceholderComponent,
    BreadCrumbComponent
  ],
})
export class SharedModule {}
