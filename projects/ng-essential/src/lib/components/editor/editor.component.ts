import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, EventEmitter, Output, Input, AfterViewInit } from '@angular/core';
import * as ace from 'ace-builds';

@Component({
  selector: 'ng-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements AfterViewInit {
  @ViewChild('editor') private editor!: ElementRef<HTMLElement>;
  @Output() contentChange = new EventEmitter<string>();
  @Input() inputText: string = '';
  @Input() isReadOnly: boolean = false;
  @Input() height: string = '60vh';
  @Input() width: string = '100%';
  @Input() fontSize: string = '16px';
  @Input() theme: string = 'xcode';
  @Input() mode: string = 'yaml';
  @Input() aceOptions: any = {}; // New input for Ace editor options

  private aceEditor!: ace.Ace.Editor; // Store reference to the editor

  ngAfterViewInit(): void {
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.32.5/src-noconflict');
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.initializeEditor();
  }

  private initializeEditor(): void {
    // Apply basic configurations
    this.aceEditor.session.setValue(this.inputText);
    this.aceEditor.setTheme(`ace/theme/${this.theme}`);
    this.aceEditor.session.setMode(`ace/mode/${this.mode}`);
    this.aceEditor.setReadOnly(this.isReadOnly);

    // Apply additional options from aceOptions input
    this.aceEditor.setOptions({
      ...this.aceOptions, // Spread operator to merge options
      fontSize: this.fontSize // Ensure fontSize is applied from input
    });

    // Listen to editor changes
    this.aceEditor.on('change', () => {
      this.contentChange.emit(this.aceEditor.getValue()); // Emit the content on change
    });

    // Adjust editor's size
    this.aceEditor.container.style.height = this.height;
    this.aceEditor.container.style.width = this.width;
    this.aceEditor.resize(true); // Important to call resize after changing size
  }
}
