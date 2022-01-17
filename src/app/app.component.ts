import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageService } from './services/page-title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public pageTitle: string = '';
  public isPageLoading: boolean = true;

  subs: Subscription = new Subscription();
  constructor(private pageService: PageService, private router: Router) {}

  ngOnInit(): void {
    this.subs.add(
      this.pageService.currentPageTitle$.subscribe(
        (title) => (this.pageTitle = title)
      )
    );

    this.subs.add(
      this.pageService.currentPageLoading$.subscribe(
        (isLoading) => (this.isPageLoading = isLoading)
      )
    );
  }

  goHome(): void {
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
