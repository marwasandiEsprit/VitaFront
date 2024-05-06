import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeQuoteComponent } from './edite-quote.component';

describe('EditeQuoteComponent', () => {
  let component: EditeQuoteComponent;
  let fixture: ComponentFixture<EditeQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditeQuoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditeQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
