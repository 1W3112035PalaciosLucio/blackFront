import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrupierComponent } from './crupier.component';

describe('CrupierComponent', () => {
  let component: CrupierComponent;
  let fixture: ComponentFixture<CrupierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrupierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrupierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
