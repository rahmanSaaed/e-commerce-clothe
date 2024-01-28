import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '@shared/shared.module';
import { SwiperModule } from 'swiper/angular';
import { MoodCardComponent } from './components/mood-card/mood-card.component';
import { ClientCardComponent } from './components/client-card/client-card.component';

@NgModule({
  declarations: [HomeComponent, MoodCardComponent, ClientCardComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule, SwiperModule],
})
export class HomeModule {}
