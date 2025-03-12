import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DetailsContainerComponent } from '../../containers/details-container/details-container.component';

@Component({
  selector: 'lib-form-layout',
  imports: [RouterOutlet, DetailsContainerComponent],
  templateUrl: './form-layout.component.html',
  styleUrl: './form-layout.component.scss'
})
export class FormLayoutComponent {

}
