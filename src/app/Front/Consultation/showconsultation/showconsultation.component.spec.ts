import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowconsultationComponent } from './showconsultation.component';

describe('ShowconsultationComponent', () => {
  let component: ShowconsultationComponent;
  let fixture: ComponentFixture<ShowconsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowconsultationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowconsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
