import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  // Observable string sources
  private emitChangePageTitle = new Subject<string>();
  private emitChangePageLoading = new Subject<boolean>();
  // Observable string streams
  currentPageTitle$ = this.emitChangePageTitle.asObservable();
  currentPageLoading$ = this.emitChangePageLoading.asObservable();
  // Service message commands
  emitCurrentPageTitle(title: string): void {
    setTimeout(() => {
      this.emitChangePageTitle.next(title);
    }, 100);
  }
  emitCurrentPageLoading(isLoading: boolean): void {
    setTimeout(() => {
      this.emitChangePageLoading.next(isLoading);
    }, 100);
  }
}
