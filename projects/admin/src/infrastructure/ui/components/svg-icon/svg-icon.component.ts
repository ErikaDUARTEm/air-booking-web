import { Component, Input } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'lib-svg-icon',
  imports: [],
  templateUrl: './svg-icon.component.html',
  styleUrl: './svg-icon.component.scss'
})
export class SvgIconComponent {
  @Input() set svgContent(value: string) {
    this._svgContent = this.sanitizer.bypassSecurityTrustHtml(value);
  }
  get svgContent(): SafeHtml {
    return this._svgContent;
  }
  private _svgContent!: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}
}
