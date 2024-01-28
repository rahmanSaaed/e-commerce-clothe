import { Component, OnInit } from '@angular/core';
import { FacadeService } from '@core/facade/facade.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  aboutUs: any;
  whyShopWithUs: any;
  images: any[] = [];

  constructor(private facade: FacadeService
    ) { }

  ngOnInit(): void {
    this.getAbouUs();
  }

  getAbouUs() {
    this.facade.aboutUs().subscribe((res: any) => {
      console.log('getAbouUs', res);
      this.aboutUs = res?.data?.about;
      this.images = [...this.aboutUs?.images];
      console.log(this.images);
    }, (error: any) => {
    })
  }

}
