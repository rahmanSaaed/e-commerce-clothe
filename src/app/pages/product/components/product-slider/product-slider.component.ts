import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import SwiperCore, { Thumbs, Controller } from 'swiper/core';
SwiperCore.use([Thumbs, Controller]);

@Component({
  selector: 'product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss'],
})
export class ProductSliderComponent implements OnInit, AfterViewInit {
  @Input() images: any;
  mainSlider: any;
  subSlider: any;
  mainSliderConfig: any = {
    slidesPerView: 1,
  };
  subSliderConfig: any = {
    spaceBetween: 10,
    slidesPerView: 'auto',
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    slideToClickedSlide: true,
    centeredSlides: false,
  };
  onSwiperMain(swiper: any) {
    this.mainSlider = swiper;
  }
  onSwiperSub(swiper: any) {
    this.subSlider = swiper;
  }
  onSlideChangeMain(e: any) {
    this.subSlider.slideTo(e.activeIndex);
  }
  onSlideChangeSub(e: any) {
    this.mainSlider.slideTo(e.activeIndex);
  }

  constructor() {}

  ngOnInit(): void {
    // console.log(this.mainSlider);
  }
  ngAfterViewInit(): void {
    console.log(this.subSlider);
  }
}
