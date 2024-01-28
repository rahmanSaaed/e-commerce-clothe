import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from '@core/facade/facade.service';
import { HandleErrorsService } from '@core/services/handle-errors/handle-errors.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isSubmitting: boolean = false;
	passwordMacher: string = '';
	matched: boolean = false;
  signUpForm: any;

  constructor(private fb: FormBuilder,
    private facade: FacadeService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private handleErrorsService: HandleErrorsService
    ) { }

  ngOnInit(): void {
    this.initSignUpForm();
    this.setEmailValue();
  }

  initSignUpForm () {
    this.signUpForm = this.fb.group({
      buyerFirstName: ['', Validators.required],
      buyerLastName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', Validators.required]
      // termsAccept: ['', Validators.requiredTrue],
      // isSubscribed: [false]
    });
  }

  setEmailValue() {
    this.signUpForm.patchValue({
      email: this.activateRoute.snapshot.queryParamMap.get('email')
    })
  }


  register() {
    console.log('register')
    delete this.signUpForm?.value?.termsAccept;
    delete this.signUpForm?.value?.confirmPassword;

    const variables = { userSignUpDetailsInput: this.signUpForm.value }

    this.isSubmitting = true;

    this.facade.register(variables).subscribe(({ data }) => {
      this.isSubmitting = false;
      console.log('data', data);
      if (data) {
        this.router.navigate(['auth/confirm'], {
          queryParams: { activationEmail: this.signUpForm.value.email },
        });
        this.signUpForm.reset();
      }
    }, err => {
      this.handleErrorsService.handleError(err);
      console.log('err', err);
      this.isSubmitting = false;

    });
  }

  navigateauth(email: string, page: string) {
    this.router.navigate([`auth/${page}`], {
      queryParams: { email: email },
    });
  }



  get email() {
    console.log(this.signUpForm.get('email')?.hasError('pattern'))
    return this.signUpForm.get('email');
  }

  get buyerFirstName() {
    return this.signUpForm.get('buyerFirstName');
  }

  get buyerLastName() {
    return this.signUpForm.get('buyerLastName');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    console.log()
    this.matchPasswords();
    return this.signUpForm.get('confirmpassword');
  }

  get phoneNumber() {
    return this.signUpForm.get('phoneNumber');
  }

  // get termsAccept() {
  //   return this.signUpForm.get('termsAccept');
  // }

	matchPasswords() {

		if ((this.signUpForm.get('confirmpassword') === this.signUpForm.get('password'))) {
			this.matched = false;
		} else {
			this.matched = true;
    }
    console.log('matchPasswords', this.matched);
	}

}
