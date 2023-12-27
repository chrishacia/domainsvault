import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currentDomain: string = '';

  constructor() { }

  ngOnInit(): void {
    this.currentDomain = window.location.hostname;
  }
}
