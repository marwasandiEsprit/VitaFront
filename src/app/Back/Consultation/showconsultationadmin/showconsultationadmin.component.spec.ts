import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowconsultationadminComponent } from './showconsultationadmin.component';

describe('ShowconsultationadminComponent', () => {
  let component: ShowconsultationadminComponent;
  let fixture: ComponentFixture<ShowconsultationadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowconsultationadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowconsultationadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
