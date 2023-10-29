import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateAgentComponent } from './create-or-update-agent.component';

describe('CreateOrUpdateAgentComponent', () => {
  let component: CreateOrUpdateAgentComponent;
  let fixture: ComponentFixture<CreateOrUpdateAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
