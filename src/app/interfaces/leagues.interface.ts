export interface Leagues {
  get: string;
  parameters: [];
  errors: [];
  results: number;
  response: [
    {
      league: League[];
    }
  ];
}

export interface League {
  id: number;
  name: string;
  type: string;
  logo: string;
}
