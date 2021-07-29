import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceXViewComponent } from './space-x-view.component';

describe('SpaceXViewComponent', () => {
  let component: SpaceXViewComponent;
  let fixture: ComponentFixture<SpaceXViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaceXViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceXViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
