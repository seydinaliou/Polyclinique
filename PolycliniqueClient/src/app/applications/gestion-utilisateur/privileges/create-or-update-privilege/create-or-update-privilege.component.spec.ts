import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdatePrivilegeComponent } from './create-or-update-privilege.component';

describe('CreateOrUpdatePrivilegeComponent', () => {
  let component: CreateOrUpdatePrivilegeComponent;
  let fixture: ComponentFixture<CreateOrUpdatePrivilegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdatePrivilegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdatePrivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
