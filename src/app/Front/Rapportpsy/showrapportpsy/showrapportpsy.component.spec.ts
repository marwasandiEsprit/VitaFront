import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowrapportpsyComponent } from './showrapportpsy.component';

describe('ShowrapportpsyComponent', () => {
  let component: ShowrapportpsyComponent;
  let fixture: ComponentFixture<ShowrapportpsyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowrapportpsyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowrapportpsyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
