import { Component, Input } from '@angular/core';
import { FooterSectionModel } from '../../../../domain/model/footerSection.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-footer-section',
  imports: [CommonModule],
  templateUrl: './footer-section.component.html',
  styleUrl: './footer-section.component.scss',
})
export class FooterSectionComponent {
  @Input() section!: FooterSectionModel;
}
