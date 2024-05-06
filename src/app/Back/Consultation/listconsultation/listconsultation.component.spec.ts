import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListconsultationComponent } from './listconsultation.component';

describe('ListconsultationComponent', () => {
  let component: ListconsultationComponent;
  let fixture: ComponentFixture<ListconsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListconsultationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListconsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
