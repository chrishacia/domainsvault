import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  currentPath: string = '';
  isLogged: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentPath = this.router.url.split('/')[1];
    console.log(this.currentPath);
    // window.location.pathname.split('/')[1];
    this.isLogged = localStorage.getItem('token') ? true : false;
  }
}
