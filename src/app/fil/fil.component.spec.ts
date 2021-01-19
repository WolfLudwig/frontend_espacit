import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilComponent } from './fil.component';

describe('FilComponent', () => {
  let component: FilComponent;
  let fixture: ComponentFixture<FilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
