import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup = new FormGroup({});
  endPoint: string = `${location.protocol}//${location.hostname}:3000/api/message`;
  msgType: string = 'contact';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      message_type: [this.msgType],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.http.post(this.endPoint, this.contactForm.value)
        .subscribe({
          next: (response) => {
            console.log('Server response:', response);
            this.contactForm.reset();
          },
          error: (error) => {
            // Handle error response here
            console.error('Error:', error);
          }
        });
    } else {
      this.markFormGroupTouched(this.contactForm);
    }
  }

    markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
