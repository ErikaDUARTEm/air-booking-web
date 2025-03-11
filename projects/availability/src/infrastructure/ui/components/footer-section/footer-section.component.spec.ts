import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FooterSectionComponent } from './footer-section.component';
import { FooterSectionModel } from '../../../../domain/model/footerSection.model';

describe('FooterSectionComponent', () => {
  let component: FooterSectionComponent;
  let fixture: ComponentFixture<FooterSectionComponent>;
  const mockSection: FooterSectionModel = {
    title: 'Test Section',
    links: [
      { text: 'Enlace 1', link: '#' },
      { text: 'Enlace 2', link: '#' },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterSectionComponent);
    component = fixture.componentInstance;
    component.section = mockSection;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the section title', () => {
    const titleEl = fixture.debugElement.query(
      By.css('.footer-section__title')
    );
    expect(titleEl.nativeElement.textContent).toContain(mockSection.title);
  });

  it('should render all links', () => {
    const links = fixture.debugElement.queryAll(
      By.css('.footer-section__menu-item a')
    );
    expect(links.length).toBe(mockSection.links.length);
  });

  it('should render links with correct text and href', () => {
    const links = fixture.debugElement.queryAll(
      By.css('.footer-section__menu-item a')
    );

    mockSection.links.forEach((link, index) => {
      const anchor = links[index].nativeElement;
      expect(anchor.textContent.trim()).toBe(link.text);
      expect(anchor.getAttribute('href')).toBe(link.link);
    });
  });
});
