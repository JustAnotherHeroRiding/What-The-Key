import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './library/library.component';
import { DeletedComponent } from './deleted/deleted.component';
import { SingleTrackPageComponent } from './single-track-page/single-track-page.component';

const routes: Routes = [
  {
    path: 'library',
    component: LibraryComponent,
  },
  {
    path: 'deleted',
    component: DeletedComponent,
  },
  {
    path: 'track/:id',
    component: SingleTrackPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackRoutingModule {}
