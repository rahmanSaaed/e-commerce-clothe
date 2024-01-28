import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { SharedModule } from '@shared/shared.module';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { BlogSingleComponent } from './blog-single/blog-single.component';

@NgModule({
  declarations: [BlogComponent, BlogCardComponent, BlogSingleComponent],
  imports: [CommonModule, BlogRoutingModule, SharedModule],
})
export class BlogModule {}
