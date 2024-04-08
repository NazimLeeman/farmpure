import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealComponent } from './reveal.component';

describe('RevealComponent', () => {
  let component: RevealComponent;
  let fixture: ComponentFixture<RevealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevealComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RevealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
