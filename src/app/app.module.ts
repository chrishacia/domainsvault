import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './shared/nav/nav.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { pageComponents, routes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    ...pageComponents
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    HeaderComponent,
    NavComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
