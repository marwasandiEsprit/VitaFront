import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteconsultationComponent } from './deleteconsultation.component';

describe('DeleteconsultationComponent', () => {
  let component: DeleteconsultationComponent;
  let fixture: ComponentFixture<DeleteconsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteconsultationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteconsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
