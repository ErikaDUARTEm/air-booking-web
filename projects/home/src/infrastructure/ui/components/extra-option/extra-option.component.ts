import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-extra-option',
  templateUrl: './extra-option.component.html',
  styleUrls: ['./extra-option.component.scss'],
})
export class ExtraOptionComponent {
  @Input() href: string = '#';
  @Input() imgSrc: string = '';
  @Input() imgAlt: string = '';
  @Input() text: string = '';
}
