import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePrivilegeComponent } from './liste-privilege.component';

describe('ListePrivilegeComponent', () => {
  let component: ListePrivilegeComponent;
  let fixture: ComponentFixture<ListePrivilegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListePrivilegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListePrivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
