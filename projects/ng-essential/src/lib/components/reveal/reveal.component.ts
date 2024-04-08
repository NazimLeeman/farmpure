import { AfterViewInit, Component, Input, OnDestroy, OnInit, inject } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import Highlight from "reveal.js/plugin/highlight/highlight.esm.js";
import mermaid from "mermaid";
// import { Deck } from "@app/shared/interfaces";

@Component({
  selector: 'ng-reveal',
  standalone: true,
  imports: [],
  templateUrl: './reveal.component.html',
  styles: ``
})
export class RevealComponent implements OnInit, AfterViewInit, OnDestroy {
  private sanitizer = inject(DomSanitizer);
	isRevealInitialized: boolean = false;
	// @Input() deck!: Deck | unknown;
	@Input() deckHtml: string = ``;
	@Input() layoutMode: string = "preview"; // presentation or preview
	safeHtml!: SafeHtml;

	ngOnInit(): void {
		this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.deckHtml);
	}

	ngOnChanges(): void {
		this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.deckHtml);
	}

	ngAfterViewInit() {
		Reveal.initialize({
			progress: true,
			plugins: [Markdown, Highlight],
			scrollActivationWidth: undefined,
			touch: true,
			embedded: true,
		});

		this.initializeMermaid();
		this.isRevealInitialized = true;
	}

	private initializeMermaid() {
		mermaid.initialize({ startOnLoad: true });

		// re-render Mermaid diagrams
		// whenever navigating between slides if they are not rendered properly.
		Reveal.on("slidechanged", (event) => {
			mermaid.init(undefined, ".mermaid");
		});
	}

  ngOnDestroy() {
    Reveal.destroy();
    // Reveal.removeEventListeners();
  }

}
