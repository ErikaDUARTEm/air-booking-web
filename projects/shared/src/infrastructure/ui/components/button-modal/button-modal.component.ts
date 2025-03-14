import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'lib-button-modal',
  imports: [CommonModule],
  templateUrl: './button-modal.component.html',
  styleUrl: './button-modal.component.scss'
})
export class ButtonModalComponent {
  text = input<string>();
  variant = input<"primary" | "secondary" | "tertiary" |"noText">("primary");
  onClick = output<void>()
}
