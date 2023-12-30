import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DomainListResponse, DomainsService } from '../domains.service';


@Component({
  selector: 'app-make-offer',
  templateUrl: './make-offer.component.html',
  styleUrls: ['./make-offer.component.scss']
})
export class MakeOfferComponent implements OnInit {
  contactForm: FormGroup = new FormGroup({});
  endPoint: string = `${location.protocol}//${location.hostname}:3000/api/message`;
  msgType: string = 'offer';
  showSuccessBanner: boolean = false;
  showErrorBanner: boolean = false;
  domains: any = [];

  constructor(private domainsService: DomainsService, private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      message_type: [this.msgType],
      other: ['', Validators.required],
      domain: [location.hostname === 'localhost' ? 'domainsvault.com' : location.hostname, Validators.required]
    });

    this.domainsService.getData().subscribe({
      next: (value: DomainListResponse): void => {
        this.domains = value.domains.map((domain: any) => domain.name);
      },
      error: (error: any): void => {
        console.log(error);
      }
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
