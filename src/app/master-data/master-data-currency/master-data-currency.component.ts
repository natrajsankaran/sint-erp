import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingIndicativeComponent } from '../../_shared/_supers/loading-indicative.component';
import { CurrencyService } from '../../_shared/_services/master-data/currency.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Currency } from '../../_shared/_types/master-data/currency';
import { EdittableListItem } from '../../_shared/_types/_form/edittableListItem';

interface CurrencyEdittableListItem extends Currency, EdittableListItem { }

@Component({
  selector: 'app-master-data-currency',
  templateUrl: './master-data-currency.component.html',
  styleUrls: ['./master-data-currency.component.css']
})
export class MasterDataCurrencyComponent extends LoadingIndicativeComponent implements OnInit, OnDestroy {

  destroySubject$: Subject<void> = new Subject();
  currenciesListData: Currency[];
  currencyEdittableList: CurrencyEdittableListItem[];

  constructor(
    // private formBuilder: FormBuilder,
    private currencyService: CurrencyService
  ) {
    super();
  }

  ngOnInit(): void {
    this.updateLoadingStatus('currenciesListData', true);
    this.currencyService.list().pipe(takeUntil(this.destroySubject$)).subscribe((currencies: Currency[]) => {
      this.currenciesListData = currencies;
      for (const currency of this.currenciesListData) {
        this.pushListItemAsEdittableListItem(currency);
      }
      this.updateLoadingStatus('currenciesListData', false);
    });
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
  }

  pushListItemAsEdittableListItem(currency: Currency) {
    let newCurrencyEdittableListItem: CurrencyEdittableListItem = currency as CurrencyEdittableListItem;
    newCurrencyEdittableListItem.isEditted = false;
    newCurrencyEdittableListItem.editForm = null;
  }

}
