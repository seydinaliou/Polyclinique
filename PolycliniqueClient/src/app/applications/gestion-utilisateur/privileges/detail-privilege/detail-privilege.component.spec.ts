import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPrivilegeComponent } from './detail-privilege.component';

describe('DetailPrivilegeComponent', () => {
  let component: DetailPrivilegeComponent;
  let fixture: ComponentFixture<DetailPrivilegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPrivilegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPrivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
