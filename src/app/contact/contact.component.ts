import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup = new FormGroup({});
  endPoint: string = `${environment.apiUrl}/message`;
  msgType: string = 'contact';
  showSuccessBanner: boolean = false;
  showErrorBanner: boolean = false;

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
            // console.log('Server response:', response);
            this.showMessageSuccessBanner();
            this.contactForm.reset();
          },
          error: (error) => {
            // Handle error response here
            this.showMessageErrorBanner();
            console.error('Error:', error);
          }
        });
    } else {
      this.markFormGroupTouched(this.contactForm);
    }
  }

  showMessageSuccessBanner() {
    this.showSuccessBanner = true;
    setTimeout(() => {
      this.showSuccessBanner = false;
    }, 5000);
  }

  showMessageErrorBanner() {
    this.showErrorBanner = true;
    setTimeout(() => {
      this.showErrorBanner = false;
    }, 5000);
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
