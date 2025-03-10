import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { NewDestinyComponent } from '../../components/new-destiny/new-destiny.component';
import { BestFlightsComponent } from '../../components/best-flights/best-flights.component';
import { RecomendationsSectionComponent } from '../../components/recomendations-section/recomendations-section.component';
import { PromptionsSectionComponent } from '../../components/promptions-section/promptions-section.component';

@Component({
  selector: 'lib-home',
  imports: [
    HeroComponent,
    NewDestinyComponent,
    BestFlightsComponent,
    RecomendationsSectionComponent,
    PromptionsSectionComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
