import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDataOverviewComponent } from './master-data-overview.component';

describe('MasterDataOverviewComponent', () => {
  let component: MasterDataOverviewComponent;
  let fixture: ComponentFixture<MasterDataOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterDataOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDataOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
