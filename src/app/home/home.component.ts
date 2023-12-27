import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  currentDomain: string = '';
  localhostOrPrimary: boolean = true;
  primaryDomains: Array<String> = [
    'localhost',
    'domainsvault.com'
  ];

  constructor() { }

  isLocalhostOrPrimary = (): boolean => this.primaryDomains.includes(this.currentDomain);

  ngOnInit(): void {
    this.currentDomain = window.location.hostname;
    this.localhostOrPrimary = this.isLocalhostOrPrimary();
  }
}
