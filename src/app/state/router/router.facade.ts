import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RouterState } from './router.reducer';
import { getRouterDataItem, getRouterParam } from './router.selectors';

@Injectable({ providedIn: 'root' })
export class RouterFacade {
  constructor(private readonly store: Store<RouterState>) {}

  public getDataItem<T = any>(name: string): Observable<T> {
    return this.store.select(getRouterDataItem(name));
  }

  public getParam(name: string): Observable<string> {
    return this.store.select(getRouterParam(name));
  }

  public getParams<T extends { [key: string]: string }>(...names: string[]): Observable<T> {
    return combineLatest(names.map(name => this.getParam(name))).pipe(
      map(values => {
        return names.reduce((params, name, index) => {
          return { ...params, [name]: values[index] };
        }, {} as T);
      }),
    );
  }
}
