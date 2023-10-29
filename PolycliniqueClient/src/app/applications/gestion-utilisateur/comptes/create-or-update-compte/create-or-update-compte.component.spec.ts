import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateCompteComponent } from './create-or-update-compte.component';

describe('CreateOrUpdateCompteComponent', () => {
  let component: CreateOrUpdateCompteComponent;
  let fixture: ComponentFixture<CreateOrUpdateCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateCompteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
