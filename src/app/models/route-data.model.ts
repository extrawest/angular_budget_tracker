export interface BackLink {
  route: string;
  title: string;
}

export interface RouteData {
  backLink?: BackLink;
  title?: string;
}
