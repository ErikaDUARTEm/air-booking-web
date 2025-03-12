import { Component } from '@angular/core';
import { LogoComponent } from 'shared';
import { FooterSectionComponent } from '../footer-section/footer-section.component';
import { CommonModule } from '@angular/common';
import { FooterSectionModel } from '../../../../domain/model/footerSection.model';

@Component({
  selector: 'lib-footer',
  imports: [FooterSectionComponent, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  sections: FooterSectionModel[] = [
    {
      title: 'Acerca de Copa Airlines',
      links: [
        { text: 'Noticias', link: '#' },
        { text: 'Inversionistas', link: '#' },
        { text: 'Trabaje con nosotros', link: '#' },
        { text: 'Sostenibilidad', link: '#' },
      ],
    },
    {
      title: 'Información legal',
      links: [
        { text: 'Términos y condiciones', link: '#' },
        { text: 'Contrato de transporte', link: '#' },
        { text: 'Política de privacidad', link: '#' },
        { text: 'Plan de accesibilidad', link: '#' },
        { text: 'Información Legal', link: '#' },
        {
          text: 'Código de conducta para la prevención de explotación de menores',
          link: '#',
        },
      ],
    },
    {
      title: 'Otros servicios',
      links: [
        { text: 'Copa Cargo', link: '#' },
        { text: 'Copa Courier', link: '#' },
        { text: 'Convenciones', link: '#' },
        { text: 'Programa corporativo', link: '#' },
      ],
    },
  ];

  images = [
    {
      src: 'https://www.copaair.com/assets/skytrax-award-2023.png',
      alt: 'Skytrax Award 2023',
    },
    {
      src: 'https://www.copaair.com/assets/traveler-readers-award-2023.png',
      alt: 'Traveler Readers Award 2023',
    },
    {
      src: 'https://www.copaair.com/assets/oag-puntuality-league-2023.png',
      alt: 'OAG Puntuality League 2023',
    },
  ];
  socialMedia = [
    {
      src: 'https://www.copaair.com/assets/Twitter.svg',
      alt: 'Twitter',
      link: '#',
    },
    {
      src: 'https://www.copaair.com/assets/Facebook.svg',
      alt: 'Facebook',
      link: '#',
    },
    {
      src: 'https://www.copaair.com/assets/Instagram.svg',
      alt: 'Instagram',
      link: '#',
    },
    {
      src: 'home/logo-tiktok.svg',
      alt: 'TikTok',
      link: '#',
    },
  ];
}
