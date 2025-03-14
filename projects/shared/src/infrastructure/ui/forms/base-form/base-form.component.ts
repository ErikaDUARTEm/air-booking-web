import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'lib-base-form',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './base-form.component.html',
  styleUrl: './base-form.component.scss',
})
export class BaseFormComponent {
  @Input() model!: any;
  @Input() labelsMap: Record<string, string> = {};
  @Input() formGroup!: FormGroup; 
  
  fields: any[] = [];

  ngOnInit(): void {
    if (!this.model) {
      console.error('No model provided');
      return;
    }
  
    this.fields = this.generateFieldsFromModel(this.model);
  
    // Solo crear formGroup si no viene desde el padre
    if (!this.formGroup) {
      this.formGroup = this.createFormGroup(this.fields);
    } else {
      // Si ya existe, sincronizar los valores del modelo
      Object.keys(this.model).forEach((key) => {
        if (this.formGroup.controls[key]) {
          this.formGroup.controls[key].setValue(this.model[key]);
        }
      });
    }
  }
  

  generateFieldsFromModel(model: any): any[] {
    return Object.keys(model).map((key) => ({
      label: this.labelsMap[key] || key,
      name: key,
      type: this.getFieldType(model[key]),
      value: model[key] || '',
      validators: this.getValidatorsForKey(key),
      disable: key === 'id',
    }));
  }
  private getFieldType(value: any): string {
    if (typeof value === 'boolean') return 'checkbox';
    if (typeof value === 'number') return 'number';
    return 'text';
  }

  private getValidatorsForKey(key: string): any[] {
    if (key.includes('email')) return [Validators.required, Validators.email];
    if (key.includes('price')) return [Validators.required, Validators.min(0)];
    if (key.includes('time')) return [Validators.required];
    return [Validators.required];
  }

  private createFormGroup(fields: any[]): FormGroup {
    const group: any = {};
    fields.forEach((field) => {
      group[field.name] = new FormControl(field.value, field.validators);
    });
    return new FormGroup(group);
  }
}
