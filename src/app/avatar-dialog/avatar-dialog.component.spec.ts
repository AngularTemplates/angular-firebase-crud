import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarDialogComponent } from './avatar-dialog.component';

describe('AvatarDialogComponent', () => {
  let component: AvatarDialogComponent;
  let fixture: ComponentFixture<AvatarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
