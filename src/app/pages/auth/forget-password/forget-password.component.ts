import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FacadeService } from '@core/facade/facade.service';
import { HandleErrorsService } from '@core/services/handle-errors/handle-errors.service';
import { SessionStorageService } from '@core/services/session-storage/session-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  showSpinner: boolean = false;
  buttonText: string = 'send'
  resetPasswrdForm: any;
  isSubmitting!: boolean;

  constructor(
    private facade: FacadeService,
    private fb: FormBuilder,
    private handleErrorsService: HandleErrorsService,
    private router: Router,

  ) {
    this.initLogin();
  }

  ngOnInit(): void {
    // console.log('globals', this.global.sendEmail)
    // this.getLang();
  }


  initLogin() {
    this.resetPasswrdForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['']
    });
  }

  sendForgetPass() {
    this.isSubmitting = true;
    delete this.resetPasswrdForm.value.password;
    const variables = { forgetPasswordInput: this.resetPasswrdForm.value }

    this.facade.forgetPassword(variables).subscribe(data => {
      this.navigateToConfirm();
      console.log(data);
      this.isSubmitting = false;
    }, err => {
      this.handleErrorsService.handleError(err);
      this.isSubmitting = false;
    }

    )
  }


  navigateToConfirm() {
    this.router.navigate(['auth/confirm'], {
      queryParams: { resetEmail: this.resetPasswrdForm.value.email },
    });
  }

  sleep(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  get email() {
    return this.resetPasswrdForm.get('email');
  }


}
