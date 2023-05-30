export interface Countries {
  get: string;
  parameters: [];
  errors: [];
  results: number;
  response: Country[];
}

export interface Country {
  name: string;
  code: string;
  flag: string;
}
