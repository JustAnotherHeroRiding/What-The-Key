import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component';
import { AvatarComponent } from '../components/avatar/avatar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoadingSpinnerComponent, AvatarComponent],
  imports: [CommonModule, FormsModule],
  exports: [LoadingSpinnerComponent, AvatarComponent],
})
export class SharedModule {}
