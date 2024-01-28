import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacadeService } from '@core/facade/facade.service';
import { HandleErrorsService } from '@core/services/handle-errors/handle-errors.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-confirm-registeration',
  templateUrl: './confirm-registeration.component.html',
  styleUrls: ['./confirm-registeration.component.scss']
})
export class ConfirmRegisterationComponent implements OnInit {

  isSubmitting: boolean = false;
  activeResend: any;
  activationEmail: boolean = false;
  resetEmail: boolean = false;

  timer!: any;
  timeleft!: number;
  initTimer!: string;
  constructor(
    private facade: FacadeService,
    private activateRoute: ActivatedRoute,
    private handleErrorsService: HandleErrorsService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.grtQuery();
    clearInterval(this.timer);
    this.startCountDwon();
    console.log('ngOnInit');
  }

  grtQuery() {
    if (this.activateRoute.snapshot.queryParamMap.get('activationEmail')) {
      this.activationEmail = true;
    } else  if (this.activateRoute.snapshot.queryParamMap.get('resetEmail')) {
      this.resetEmail = true;
    }
  }

  sendReset() {
    this.isSubmitting = false;
    if (this.activateRoute.snapshot.queryParamMap.get('activationEmail')) {
      this.sendResetPassword()

    } else if (this.activateRoute.snapshot.queryParamMap.get('resetEmail')) {
      this.sendResetPasswosendForgetPassrd();
    }
  }

  sendResetPassword() {
    this.isSubmitting = true;
    const emailParam = {
      email: this.activateRoute.snapshot.queryParamMap.get('activationEmail'),
    };
    const variables = { resendActivationInput: emailParam }
    this.facade.resendActivationMail(variables).subscribe(
      (data) => {
        this.isSubmitting = false;
        if (data) {
          this.startCountDwon();
        }
      },
      (error) => {
        this.isSubmitting = false;
        this.handleErrorsService.handleError(error);
      }
    );
  }

  sendResetPasswosendForgetPassrd() {
      this.isSubmitting = true;
    const emailParam = {
      email: this.activateRoute.snapshot.queryParamMap.get('resetEmail'),
    };
    const variables = { forgetPasswordInput: emailParam }
    this.facade.forgetPassword(variables).subscribe(
      (data) => {
        this.isSubmitting = false;
        if (data) {
          this.startCountDwon();
        }
      },
      (error) => {
        this.isSubmitting = false;
        this.handleErrorsService.handleError(error);
      }
    );
  }


  startCountDwon() {

    this.stopTimer();
    this.activeResend = true;
    this.timeleft = 30;
    this.timer = setInterval(() => {
      if (this.timeleft <= 0) {
        this.initTimer = '00 : 00';
        this.activeResend = false;
      } else {
        if (this.timeleft < 10) {
          this.initTimer ='0' + this.timeleft + ' : 00';
        } else {
          this.initTimer = this.timeleft + ' : 00';
      }}
      this.timeleft -= 1;
    }, 1000);
  }


  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    this.stopTimer();
  }

}
