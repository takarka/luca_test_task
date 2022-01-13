import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/course-list/course-list.module').then(
        (m) => m.CourseListModule
      ),
  },
  {
    path: 'editor/:id',
    loadChildren: () =>
      import('./pages/course-detail/course-detail.module').then(
        (m) => m.CourseDetailModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
