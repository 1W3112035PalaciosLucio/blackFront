import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidaReanudadaComponent } from './partida-reanudada.component';

describe('PartidaReanudadaComponent', () => {
  let component: PartidaReanudadaComponent;
  let fixture: ComponentFixture<PartidaReanudadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartidaReanudadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartidaReanudadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
