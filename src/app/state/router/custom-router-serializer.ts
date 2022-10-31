import { RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

import { RouterStateUrl } from './router.reducer';

export class CustomRouterSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url, root: { queryParams } } = routerState;

    let route = routerState.root;
    let data = route.data;
    let params = route.params;

    while (route.firstChild) {
      route = route.firstChild;
      data = { ...data, ...route.data };
      params = { ...params, ...route.params };
    }

    return { data, params, queryParams, url };
  }
}
