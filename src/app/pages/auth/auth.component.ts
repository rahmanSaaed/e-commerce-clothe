import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FacadeService } from '@core/facade/facade.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  validateBuyer: any;
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder,
    private facadeService: FacadeService,
    private router: Router
    ) {
    this.initLogin()
   }

  ngOnInit(): void {
  }

  initLogin() {
    this.validateBuyer = this.fb.group({
      email: ['', Validators.required]
    });
  }


  validateBuyerEmail() {
    this.isSubmitting = true;
    const variables = { validateEmailInput: {
      email: this.validateBuyer.value.email
    }  }
    this.facadeService.validateBuyer(variables).subscribe(
      (data: any) => {
        this.isSubmitting = false;
        this.navigateauth(this.validateBuyer.value.email, 'login');
        console.log(data);
      },
      (error) => {
        this.isSubmitting = false;
        this.navigateauth(this.validateBuyer.value.email, 'register');
        console.log(error);
      }
    );
  }


  navigateauth(email: string, page: string) {
    this.router.navigate([`auth/${page}`], {
      queryParams: { email: email },
    });
  }

  get email() {
    console.log(this.validateBuyer.get('email'));
    return this.validateBuyer.get('email');
  }

}
