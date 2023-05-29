export interface Countries {
  get: string;
  parameters: [];
  errors: [];
  results: number;
  response: [{ name: string; code: string; flag: string }];
}
