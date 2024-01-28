import { Component, OnInit } from '@angular/core';
import { Currencies } from '@core/enums/enums';
import { FacadeService } from '@core/facade/facade.service';
import { SidebarService } from '@core/services/sidebar/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  curencies: any;
  currentCurrency: any;
  defultCurr: string = Currencies?.EGP;

  constructor(public SidebarService: SidebarService,
    private facade: FacadeService
    ) {}

  ngOnInit(): void {
    this.getCurencies();
  }


  getCurencies() {
    this.facade.getCurencies().subscribe((res: any) => {
      console.log('getCurencies', res);
      this.curencies = res?.data?.currencies;
      console.log('currency', this.facade.getItem('currency'))
      if (this.facade.getItem('currency')) {
        this.currentCurrency = JSON.parse(this.facade.getItem('currency'));
        console.log(this.currentCurrency);
      } else {
        console.log('curencies', this.curencies);
        this.currentCurrency = this.curencies.filter(
          (el: any) => el?.isoAlpha_3 == this.defultCurr
        );
        this.facade.setItem(
          'currency',
          JSON.stringify(this.currentCurrency)
        );
      }
    });
  }

}
