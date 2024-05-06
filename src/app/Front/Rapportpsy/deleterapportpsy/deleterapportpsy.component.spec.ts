import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleterapportpsyComponent } from './deleterapportpsy.component';

describe('DeleterapportpsyComponent', () => {
  let component: DeleterapportpsyComponent;
  let fixture: ComponentFixture<DeleterapportpsyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleterapportpsyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleterapportpsyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
