import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AppService } from '@app/core';
import { IconTextComponent } from '@app/shared/components';

@Component({
  selector: 'fp-index',
  standalone: true,
  imports: [CommonModule, IconTextComponent],
  templateUrl: './index.component.html',
  styles: ``
})
export class IndexComponent {
	private app = inject(AppService);

	isHandset = this.app.isHandset;
}
