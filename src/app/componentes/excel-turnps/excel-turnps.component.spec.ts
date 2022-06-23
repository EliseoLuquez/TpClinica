import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelTurnpsComponent } from './excel-turnps.component';

describe('ExcelTurnpsComponent', () => {
  let component: ExcelTurnpsComponent;
  let fixture: ComponentFixture<ExcelTurnpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelTurnpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelTurnpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
