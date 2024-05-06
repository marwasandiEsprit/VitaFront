import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowconsultationpsychiatreComponent } from './showconsultationpsychiatre.component';

describe('ShowconsultationpsychiatreComponent', () => {
  let component: ShowconsultationpsychiatreComponent;
  let fixture: ComponentFixture<ShowconsultationpsychiatreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowconsultationpsychiatreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowconsultationpsychiatreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
