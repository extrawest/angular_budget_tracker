import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import {
  distinctUntilChanged,
  filter,
  map,
  merge,
  Observable,
  of,
} from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent implements OnInit {
  public breadcrumbs$: Observable<MenuItem[]>;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.breadcrumbs$ = merge(
      of(this.buildBreadcrumbs(this.activatedRoute.root)),
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged(),
        map(() => this.buildBreadcrumbs(this.activatedRoute.root)),
      ),
    );
  }

  private buildBreadcrumbs(route: ActivatedRoute, url = '', breadcrumbs: MenuItem[] = []): MenuItem[] {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';

    if (!route.firstChild) {
      return breadcrumbs;
    }

    const child = route.firstChild;

    if (!child.routeConfig?.data?.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    const routeURL = route.snapshot.url.map(segment => segment.path).join('/');

    url += `/${routeURL}`;

    breadcrumbs.push({
      label: child.routeConfig.data[ROUTE_DATA_BREADCRUMB],
      url,
    });

    return this.buildBreadcrumbs(child, url, breadcrumbs);
  }
}
