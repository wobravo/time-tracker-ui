import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockComponent } from './clock.component';
import { interval, timer } from 'rxjs';

describe('ClockComponent', () => {
  let component: ClockComponent;
  let fixture: ComponentFixture<ClockComponent>;

  function setup() {
    // tslint:disable-next-line: no-shadowed-variable
    const fixture = TestBed.createComponent(ClockComponent);
    const app = fixture.debugElement.componentInstance;
    return { fixture, app };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the current hour of day', () => {
    const currentHour = 11;
    expect(component.currentDate.getHours()).toEqual(currentHour);
  });

  it('should show the current minutes of day', () => {
    const currenMinutes = 5;
    expect(component.currentDate.getMinutes()).toEqual(currenMinutes);
  });
});
