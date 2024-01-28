import { Component, OnInit } from '@angular/core';
import { FacadeService } from '@core/facade/facade.service';

@Component({
  selector: 'app-return-policy',
  templateUrl: './return-policy.component.html',
  styleUrls: ['./return-policy.component.scss']
})
export class ReturnPolicyComponent implements OnInit {
  returnPolicy: any;

  constructor(private facade: FacadeService) { }


  ngOnInit(): void {
    this.getTermsConditions();
  }

  getTermsConditions() {
    this.facade.getSitting().subscribe((res: any) => {
      this.returnPolicy = res?.data?.setting?.returnPolicy || res?.data?.setting?.returnPolicyAr;
      console.log(res);
    }, (error: any) => {
      this.facade.handleError(error);
    })
  }
}
