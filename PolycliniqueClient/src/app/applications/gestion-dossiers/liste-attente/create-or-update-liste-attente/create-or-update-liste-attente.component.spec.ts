import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateListeAttenteComponent } from './create-or-update-liste-attente.component';

describe('CreateOrUpdateListeAttenteComponent', () => {
  let component: CreateOrUpdateListeAttenteComponent;
  let fixture: ComponentFixture<CreateOrUpdateListeAttenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateListeAttenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateListeAttenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
