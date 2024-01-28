import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from '@core/facade/facade.service';
import { HandleErrorsService } from '@core/services/handle-errors/handle-errors.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})

export class ActivationComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private facade: FacadeService,
    private handleErrorsService: HandleErrorsService,
    // private toasster: ToastrService

  ) { }

  ngOnInit(): void {
    this.getRouteParams();
  }

  getRouteParams() {
    console.log(this.router.url);

    this.route.queryParams.subscribe((params) => {
      console.log(params);

      if (this.router.url.includes('change-user-email')) {
        this.activateChangeEmail(params);
      } else {
        this.activateRegisteration(params);
      }

    });
  }

  activateRegisteration(params: any) {
    const variables = {
      activateUserInput: {
        email: params.email,
        token: params.token,
      }
    }
    this.facade.activateUser(variables).subscribe(({ data }: any) => {
      // this.toaster.success(data['activateBuyer'].message);
      this.router.navigate(['/auth']);
    }, error => {
      this.handleErrorsService.handleError(error);
    });
  }

  activateChangeEmail(params: any) {
    const variables = {
      changeEmailInput: {
        newEmail: params.email,
        token: params.token
      }
    }
    this.facade.activateChangeEmail(variables).subscribe(({ data }: any) => {
      // this.toaster.success('Email Activated');
      if (localStorage.getItem('AUTH_TOKEN')) {
        this.router.navigate(['/account']);
      } else {
        this.router.navigate(['/auth']);
      }
    }, (error: any) => {
      this.handleErrorsService.handleError(error);
    });
  }

}
