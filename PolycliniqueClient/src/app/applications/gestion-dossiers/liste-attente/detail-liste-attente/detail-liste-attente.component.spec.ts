import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailListeAttenteComponent } from './detail-liste-attente.component';

describe('DetailListeAttenteComponent', () => {
  let component: DetailListeAttenteComponent;
  let fixture: ComponentFixture<DetailListeAttenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailListeAttenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailListeAttenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
