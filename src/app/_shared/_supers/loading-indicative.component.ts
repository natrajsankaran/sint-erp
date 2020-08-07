import { timer } from 'rxjs';

export abstract class LoadingIndicativeComponent {

  isLoading: boolean[] = [];

  updateLoadingStatus(index: string, value: boolean): void {
    this.isLoading[index] = value;
  }

  updateLoadingStatusFromViewChild(index: string, value: boolean): void {
    // use timer to avoid ExpressionChangedAfterItHasBeenCheckedError emitted due to use of view childs sometimes, which makes template unable to reflect according to latest change
    let initialiseUpdate = timer(0).subscribe((_val) => {
      initialiseUpdate.unsubscribe();
      this.updateLoadingStatus(index, value);
    });
  }
}
