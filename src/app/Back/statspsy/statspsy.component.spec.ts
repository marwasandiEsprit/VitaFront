import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatspsyComponent } from './statspsy.component';

describe('StatspsyComponent', () => {
  let component: StatspsyComponent;
  let fixture: ComponentFixture<StatspsyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatspsyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatspsyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
