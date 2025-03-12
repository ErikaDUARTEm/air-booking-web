import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeroComponent } from './hero.component';
import { SearchFormComponent } from '../../forms/search-form/search-form.component';
import { ExtraOptionComponent } from '../extra-option/extra-option.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeroComponent,
        SearchFormComponent,
        ExtraOptionComponent,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render main title', () => {
    const titleEl = fixture.debugElement.query(By.css('.flight-search__title'));
    expect(titleEl.nativeElement.textContent.trim()).toBe(
      '¿A dónde quieres volar?'
    );
  });

  it('should contain search form component', () => {
    const searchForm = fixture.debugElement.query(By.css('lib-search-form'));
    expect(searchForm).toBeTruthy();
  });

  it('should render extras title', () => {
    const extrasTitle = fixture.debugElement.query(
      By.css('.flight-search__extras-title')
    );
    expect(extrasTitle.nativeElement.textContent.trim()).toBe(
      'Más opciones para ti'
    );
  });

  it('should render all extra options', () => {
    const options = fixture.debugElement.queryAll(By.css('lib-extra-option'));
    expect(options.length).toBe(component.extraOptions.length);
  });

  it('should pass correct inputs to extra options', () => {
    const optionComponents = fixture.debugElement.queryAll(
      By.directive(ExtraOptionComponent)
    );

    component.extraOptions.forEach((expectedOption, index) => {
      const option = optionComponents[index].componentInstance;

      expect(option.href).toBe(expectedOption.href);
      expect(option.imgSrc).toBe(expectedOption.imgSrc);
      expect(option.imgAlt).toBe(expectedOption.imgAlt);
      expect(option.text).toBe(expectedOption.text);
    });
  });
});
