import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContentInnerComponent } from './main-content-inner.component';

describe('MainContentInnerComponent', () => {
  let component: MainContentInnerComponent;
  let fixture: ComponentFixture<MainContentInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainContentInnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainContentInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
