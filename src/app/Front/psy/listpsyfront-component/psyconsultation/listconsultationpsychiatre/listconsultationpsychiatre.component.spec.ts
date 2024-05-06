import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListconsultationpsychiatreComponent } from './listconsultationpsychiatre.component';

describe('ListconsultationpsychiatreComponent', () => {
  let component: ListconsultationpsychiatreComponent;
  let fixture: ComponentFixture<ListconsultationpsychiatreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListconsultationpsychiatreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListconsultationpsychiatreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
