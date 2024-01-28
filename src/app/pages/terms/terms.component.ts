import { Component, OnInit } from '@angular/core';
import { FacadeService } from '@core/facade/facade.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  termsConditions: any[] = [];


  constructor(private facade: FacadeService,

    ) {}

  ngOnInit(): void {
    this.getTermsConditions();
  }

  getTermsConditions() {
    const variables = {
      paginationOptions: {
        page: 1,
        limit: 6,
      },
    };

    this.facade.getTermsAndConditions(variables).subscribe((res: any) => {
      console.log('termsConditions', res);
      if (res?.data?.termsConditions) {
        this.termsConditions = [...res?.data?.termsConditions];
}
    });
  }

}
