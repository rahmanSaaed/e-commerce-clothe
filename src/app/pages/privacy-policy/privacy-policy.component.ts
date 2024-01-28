import { Component, OnInit } from '@angular/core';
import { FacadeService } from '@core/facade/facade.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  privacyPolicy: any;

  constructor(private facade: FacadeService) { }


  ngOnInit(): void {
    this.getPrivacyPolicy();
  }

  getPrivacyPolicy() {
    this.facade.getSitting().subscribe((res: any) => {
      this.privacyPolicy = res?.data?.setting?.privacyPolicy || res?.data?.setting?.privacyPolicyAr;
      console.log(res);
    }, (error: any) => {
      this.facade.handleError(error);
    })
  }
}
