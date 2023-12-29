import { Component, OnInit } from '@angular/core';
import { DomainsService } from '../domains.service';
import { DeepcloneService } from '../shared/deepclone.service';

@Component({
  selector: 'app-domain-list',
  templateUrl: './domain-list.component.html',
  styleUrls: ['./domain-list.component.scss']
})
export class DomainListComponent implements OnInit {
  loading: boolean = true;
  domains: any = [];
  filteredDomains: any = [];
  arrAthruZ: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
  tlds: string[] = [];
  columnNameSorted: string = 'name';
  columnDirectionSorted: string = 'asc';
  searchTerm: string = '';

  constructor(private domainsService: DomainsService, private deepCloneService: DeepcloneService) {}

  ngOnInit(): void {
    this.domainsService.getData().subscribe({
      next: data => {
        console.log(data)
        this.domains = data.domains;
        this.filteredDomains = data.domains;
        this.tlds = data.tlds;
        this.loading = false;
      },
      error: error => {
        this.loading = false;
        console.log(error);
      }
    });
  }

  recloneDomains(): void {
    console.log(this.filteredDomains);
    this.filteredDomains = this.deepCloneService.deepCopy(this.domains);
  }

  sortTableByColumnAscDesc(event: Event, columnName: string): void {
    event.preventDefault();
    if (this.columnNameSorted === columnName && this.columnDirectionSorted === 'asc') {
      this.sortTableByColumnDesc(columnName);
      this.columnDirectionSorted = 'desc';
    } else {
      this.sortTableByColumnAsc(columnName);
      this.columnDirectionSorted = 'asc';
    }
    this.columnNameSorted = columnName;
  }


  sortTableByColumnAsc(columnName: string): void {
    this.filteredDomains.sort((a: any, b: any) => {
      if (a[columnName] < b[columnName]) {
        return -1;
      }
      if (a[columnName] > b[columnName]) {
        return 1;
      }
      return 0;
    });
  }

  sortTableByColumnDesc(columnName: string): void {
    this.filteredDomains.sort((a: any, b: any) => {
      if (a[columnName] > b[columnName]) {
        return -1;
      }
      if (a[columnName] < b[columnName]) {
        return 1;
      }
      return 0;
    });
  }

  filterDomainByFirstLetter(event: Event, letter: string): void {
    event.preventDefault();
    this.recloneDomains();
    this.filteredDomains = this.filteredDomains.filter((domain: any) => domain.name[0] === letter);
  }

  filterDomainByTld(event: Event, tld: string): void {
    event.preventDefault();
    this.recloneDomains();
    this.filteredDomains = this.filteredDomains.filter((domain: any) => domain.domain_tld === tld);
  }

  filterDomainBySearchTerm(event: Event): void {
    event.preventDefault();
    this.recloneDomains();
    this.filteredDomains = this.filteredDomains.filter((domain: any) => domain.name.includes(this.searchTerm));
  }
}
