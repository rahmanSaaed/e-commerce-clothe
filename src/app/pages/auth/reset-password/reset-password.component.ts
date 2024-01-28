import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from '@core/facade/facade.service';
import { HandleErrorsService } from '@core/services/handle-errors/handle-errors.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {


	resetPassword: any;
	isSubmitting!: boolean;
	emailParam!: any;
	tokenParam!: any;
	matched: boolean = false;
	passwordMacher!: string;
	passwordType: any = 'password';
	passwordTypeConfirm: any = 'password';

	constructor(
		private facade: FacadeService,
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
    private toastr: ToastrService,

	) {
		this.initLogin();
	}

	ngOnInit(): void {
		this.getQueries();
	}

	initLogin() {
		this.resetPassword = this.fb.group({
			password: ['', Validators.required],
			confirmpassword: ['', Validators.required],
			email: [''],
			token: ['']
		});
	}


	sendResetPassword() {
    this.isSubmitting = true;
		delete this.resetPassword?.value?.confirmpassword;
		this.resetPassword.value.email = this.emailParam.toString();
		this.resetPassword.value.token = this.tokenParam.toString();
		const variables = { resetUserPasswordInput: this.resetPassword.value }
		this.facade.resetPassword(variables).subscribe(data => {
			this.isSubmitting = false;

			console.log(data);

			if (data) {
				this.toastr.success('success');
				this.router.navigate(['/auth']);
			}


    }, (error) => {
      this.isSubmitting = false;
      this.facade.handleError(error)

    }
    )}

	showHidePass(pass: any) {
		console.log(this.passwordType);
		if (pass == 'passwordTypeMain') {
			this.passwordType = undefined;
		} else if (pass == 'passwordTypeConfirm') {
			if (this.passwordTypeConfirm) {
				this.passwordTypeConfirm = undefined;
			} else {
				this.passwordTypeConfirm = 'password';
			}
		} else {
			this.passwordType = 'password';
		}
		console.log(this.passwordType);
	}

	getQueries() {
		this.emailParam = this.route.snapshot.queryParamMap.get('email');
		this.tokenParam = this.route.snapshot.queryParamMap.get('token');
	}

	get password() {
		return this.resetPassword.get('password');
	}

	get confirmpassword() {
		this.matchPasswords(this.resetPassword.get('confirmpassword'), this.resetPassword.get('password'));
		return this.resetPassword.get('confirmpassword');
	}

	matchPasswords(confirmpassword: any, password: any) {
		if ((this.resetPassword.get('confirmpassword').value === this.resetPassword.get('password').value)) {
			this.passwordMacher = 'PASS_MATCHED';
			this.matched = false;
		} else {
			this.passwordMacher = 'PASS_NOT_MATCHED';
			this.matched = true;
		}
	}

}
