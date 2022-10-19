import {HttpErrorResponse} from "@angular/common/http";

export interface ItemState<T> {
  data: T;
  loaded: boolean;
  loading: boolean;
  error: HttpErrorResponse | null;
}
