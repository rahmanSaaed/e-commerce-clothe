import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from '@core/utils/utils';

@Component({
  selector: 'category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent implements OnInit {
  @Input () name!: string;
  @Input () image!: string;
  @Input () categoryId!: string;

  util = new Utils();

      constructor(private router: Router,
        ) { }

    ngOnInit(): void {
    }

    goToCategoryProduct() {
      this.router.navigate(['/category'], { queryParams: { categoryId: this.util.createSlug(this.name , this.categoryId) } })
    }

}
