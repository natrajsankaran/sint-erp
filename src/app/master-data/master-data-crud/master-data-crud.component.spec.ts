import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDataCRUDComponent } from './master-data-crud.component';

describe('MasterDataCRUDComponent', () => {
  let component: MasterDataCRUDComponent;
  let fixture: ComponentFixture<MasterDataCRUDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterDataCRUDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDataCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
