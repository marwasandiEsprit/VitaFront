import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiactionComponent } from './verifiaction.component';

describe('VerifiactionComponent', () => {
  let component: VerifiactionComponent;
  let fixture: ComponentFixture<VerifiactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifiactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifiactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
