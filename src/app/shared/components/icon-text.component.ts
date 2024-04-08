import { Component, input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
	selector: "fp-icon-text",
	standalone: true,
	imports: [MatIconModule],
	template: `
    <span style="display: flex; align-items: center;">
      <mat-icon>{{ icon() }}</mat-icon> &nbsp;
      <span>{{ text() }}</span>
    </span>
  `,
	styles: ``,
})
export class IconTextComponent {
	icon = input<string>();
	text = input<string>();
}
