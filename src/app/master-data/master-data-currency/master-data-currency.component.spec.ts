import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDataCurrencyComponent } from './master-data-currency.component';

describe('MasterDataCurrencyComponent', () => {
  let component: MasterDataCurrencyComponent;
  let fixture: ComponentFixture<MasterDataCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterDataCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDataCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
