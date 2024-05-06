import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheudleComponent } from './scheudle.component';

describe('ScheudleComponent', () => {
  let component: ScheudleComponent;
  let fixture: ComponentFixture<ScheudleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheudleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheudleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
