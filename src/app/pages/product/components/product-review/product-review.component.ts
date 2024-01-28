import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.scss'],
})
export class ProductReviewComponent implements OnInit {
	@Input() name!:string;
	@Input() description!:string;
	@Input() rate!:string;
	@Input() image!:string;
	constructor() { }

	ngOnInit(): void {
    console.log('rate', this.rate);
    console.log('name', this.name);
	}
}
