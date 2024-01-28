import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FacadeService } from '@core/facade/facade.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {


  createContactForm = this.facade.fb({
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    description: ['', Validators.required],
    phone: ['', [Validators.required,Validators.pattern(/(201)[0-9]{9}/),Validators.minLength(12),Validators.maxLength(12)]],
  });

  isSubmitting: boolean = false;

  constructor(
    private facade: FacadeService
  ) {}

  ngOnInit(): void {
  }

  createContact() {
    console.log(this.createContactForm.value);
    const variables = {
      contactInput:  this.createContactForm.value
    }
    console.log('variables', variables);
    this.facade.createContact(variables).subscribe((res: any) => {
      console.log('data', res);
      if (res) {
        this.facade.success(`${res.data.createContact.message}`)
        this.createContactForm.reset();
      }
    }, (error: any) => {
      this.facade.handleError(error);
    });
  }


  get email() {
    return this.createContactForm.get('email');
  }

  get name() {
    return this.createContactForm.get('name');
  }

  get description() {
    return this.createContactForm.get('description');
  }

  get phone() {
    return this.createContactForm.get('phone');
  }

}
