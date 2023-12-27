import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DomainListComponent } from './domain-list/domain-list.component';
import { DomainStatsComponent } from './domain-stats/domain-stats.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MakeOfferComponent } from './make-offer/make-offer.component';
import { ManageDomainsComponent } from './manage-domains/manage-domains.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReportProblemComponent } from './report-problem/report-problem.component';

export const pageComponents = [
  AboutComponent,
  ContactComponent,
  DashboardComponent,
  DomainListComponent,
  DomainStatsComponent,
  HomeComponent,
  LoginComponent,
  MakeOfferComponent,
  ManageDomainsComponent,
  PageNotFoundComponent,
  ReportProblemComponent
];

export const routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'domain-list', component: DomainListComponent },
  { path: 'domain-stats', component: DomainStatsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'make-offer', component: MakeOfferComponent },
  { path: 'manage-domains', component: ManageDomainsComponent },
  { path: 'report-problem', component: ReportProblemComponent },
  { path: '**', component: PageNotFoundComponent }
];
