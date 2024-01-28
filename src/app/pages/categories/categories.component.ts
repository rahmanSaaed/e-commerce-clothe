import { Component, OnInit } from '@angular/core';
import { FacadeService } from '@core/facade/facade.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  allCategories!: Array<any>;
  isGettingData!: boolean;

	constructor(
		private facade: FacadeService,
	) { }

	ngOnInit(): void {
		this.getAllCategories();
	}

	getAllCategories() {

    this.isGettingData = true;
    const variables = {
      paginationOptions: {
        page: 1
      }}

		this.facade.getCategories(variables).subscribe((data: any) => {
      this.isGettingData = false;
      console.log('getCategories', data)
			if (data) {
        this.allCategories = [...data.data.categories];
        this.isGettingData = false;
			}
		})
	}



  // onScroll() {
  //   console.log('filterSubCategoryForm');
  //     this.getAllCategories();
  // }


}
