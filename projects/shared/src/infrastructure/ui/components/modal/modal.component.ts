import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ButtonModalComponent } from '../button-modal/button-modal.component';

@Component({
  selector: 'lib-modal',
  imports: [CommonModule, ButtonModalComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  actionText = input<string>();
  title? = input<string>();
  confirmText = input<string>('Confirmar');
  cancelText = input<string>('Cancelar');
  variant = input<'primary' | 'secondary' | 'tertiary' | 'noText'>();
  onConfirm = output<void>();
  onCancel = output<void>();

  public visible = false;

  toggle() {
    this.visible = !this.visible;
    // this.visible = !this.visible;
  }

  confirm() {
    this.onConfirm.emit();
    this.toggle();
  }

  cancel() {
    this.onCancel.emit();
    this.toggle();
  }
}