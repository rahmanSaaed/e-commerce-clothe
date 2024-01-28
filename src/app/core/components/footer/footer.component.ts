import { Component, OnInit } from '@angular/core';
import { FacadeService } from '@core/facade/facade.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  categoriesArr: any[] = [];
  sittingsValues: any;

  constructor(
    private facade: FacadeService
  ) {
  }

  ngOnInit(): void {
    this.getSittings();
    this.categories();
  }

  categories() {
    const variables = {
      paginationOptions: {
        page: 1,
        limit: 5,
      },
    };

    this.facade.getCategories(variables).subscribe((data: any) => {
      if (data) {
        this.categoriesArr = [...data.data.categories];
        console.log('categoriesArr', this.categoriesArr);
      }
    });
  }

  getSittings() {
    this.facade.getSitting().subscribe((res: any) => {
      this.sittingsValues = res?.data?.setting;
      console.log('settings', this.sittingsValues);
    }, err => {
      this.facade.handleError(err);
    }
    );
  }


  goToCategoryProduct(id: any) {
    this.facade.navigate(['/category'], { queryParams: { categoryId: id } });
  }

  navigateTohome() {
    this.facade.navigate(['']);
  }

}
