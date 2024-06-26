import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersGroupsComponent } from './users-groups.component';

describe('UsersGroupsComponent', () => {
  let component: UsersGroupsComponent;
  let fixture: ComponentFixture<UsersGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersGroupsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
