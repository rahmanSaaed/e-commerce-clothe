import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from '@core/facade/facade.service';
import { HandleErrorsService } from '@core/services/handle-errors/handle-errors.service';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';
import { SharingDataService } from '@core/services/sharing-data/sharing-data.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  signIn: any;
  isSubmitting: boolean = false;
  newCashCartDetails: any[] = [];
  cartIdByToken: any;
  cartProductsByToken: any[] = [];
  passwordType: any = 'password'

  constructor(
    private facade: FacadeService,
    private fb: FormBuilder,
    private localStorage: LocalStorageService,
    private handleErrorsService: HandleErrorsService,
    private route:ActivatedRoute,private router:Router,
    private sharingDataService: SharingDataService,
    private toaster: ToastrService
  ) {
    this.initLogin();
  }

  ngOnInit(): void {
    this.setEmailValue()
   }


  initLogin() {
    this.signIn = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

   setEmailValue() {
    this.signIn.patchValue({
      email: this.route.snapshot.queryParamMap.get('email')
    })
  }

  login() {
    this.isSubmitting = true;
    const variables = { authCredentialInput: this.signIn.value }

    this.facade.login(variables).subscribe(
      (data: any) => {
        this.localStorage.set('AUTH_TOKEN', data.data.signIn.accessToken);
        this.isSubmitting = false;
        this.trgigerNotficationsInhHeader();
        console.log(localStorage.getItem('redirectTo'));
        if (!localStorage.getItem('redirectTo')?.includes('confirm-registertation')) {
          // this.router.navigateByUrl(localStorage.getItem('redirectTo') || '/');
          (<any>this.router).navigate([`${localStorage.getItem('redirectTo') || '/'}`]);
        } else {
          // this.router.navigateByUrl('/');
          (<any>this.router).navigate([`/`]);

        }
      },
      (error) => {
        this.isSubmitting = false;
        console.log('loginGraphQLErrors', error?.graphQLErrors[0]);
        if (error?.graphQLErrors[0]?.extensions?.response?.statusCode == 403) {
          this.router.navigate(['auth/confirm-registertation'], {
            queryParams: { activationEmail: this.signIn.value.email },
          });
        }

        this.toaster.info(error);
      }
    );
  }


  trgigerNotficationsInhHeader(){
    this.sharingDataService.trigerNotfications('triger')
  }

  sendFaveItemToFaveNotification(){
    this.sharingDataService.nextFave('')
  }

  sendCartItemsToCartNotifications() {
    this.sharingDataService.nextCount('');
  }



  gotoForgetPage() {
    this.router.navigate(['auth/forget-password']);
  }

  showHidePass() {
    console.log(this.passwordType);
    if (this.passwordType) {
      this.passwordType = undefined;
    } else {
      this.passwordType = 'password';
    }
    console.log(this.passwordType);
  }

  get email() {
    return this.signIn.get('email');
  }

  get password() {
    return this.signIn.get('password');
  }

}
