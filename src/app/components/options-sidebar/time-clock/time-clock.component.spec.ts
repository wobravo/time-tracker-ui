import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { TimeClockComponent } from "./time-clock.component";
import { ProjectListHoverComponent } from "../../shared/project-list-hover/project-list-hover.component";

describe("TimeClockComponent", () => {
  let component: TimeClockComponent;
  let fixture: ComponentFixture<TimeClockComponent>;
  let de: DebugElement;

  function setup() {
    // tslint:disable-next-line: no-shadowed-variable
    const fixture = TestBed.createComponent(TimeClockComponent);
    const app = fixture.debugElement.componentInstance;
    return { fixture, app };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeClockComponent, ProjectListHoverComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeClockComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  it("should have p tag as 'time-clock works!'", async(() => {
    // tslint:disable-next-line: no-shadowed-variable
    const { app, fixture } = setup();
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const h1tag = compile.querySelector("p");
    expect(h1tag.textContent).toBe("time-clock works!");
  }));

  it("should set showfileds as true", () => {
    const show = true;
    component.setShowFields(show);
    expect(component.showFields).toBe(true);
  });

  it('should be called the setShowFields event #1', () => {
    spyOn(component, 'setShowFields');
    const showFields = de.query(By.directive(ProjectListHoverComponent));
    const cmp = showFields.componentInstance;
    cmp.showFields.emit(true);
    expect(component.setShowFields).toHaveBeenCalledWith(true);
  });

  it('should be called the setShowFields event #2', () => {
    spyOn(component, 'setShowFields');
    const showFields = de.query(By.directive(ProjectListHoverComponent));
    const li = showFields.query(By.css('li'));
    li.nativeElement.click();
    expect(component.setShowFields).toHaveBeenCalledWith(true);
  });
});
