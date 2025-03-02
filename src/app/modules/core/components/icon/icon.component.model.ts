export interface IconComponentModel {
  name: string;
  routerLink?: string;
  queryParams?: QueryParams;
  className?: string;
}

export interface QueryParams {
  [key: string]: string;
}
