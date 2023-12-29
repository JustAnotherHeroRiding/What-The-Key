import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackRoutingModule } from './track-routing.module';
import { LibraryComponent } from './library/library.component';
import { DeletedComponent } from './deleted/deleted.component';
import { SingleTrackPageComponent } from './single-track-page/single-track-page.component';
import { TrackComponent } from 'src/app/components/track/track.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LibraryComponent,
    DeletedComponent,
    SingleTrackPageComponent,
    TrackComponent,
  ],
  imports: [CommonModule, TrackRoutingModule, SharedModule, FormsModule],
})
export class TrackModule {}
