export interface Players {
  get: string;
  parameters: [];
  errors: [];
  results: number;
  response: [
    {
      player: Player[];
    }
  ];
}

export interface Player {
  id: number;
  name: string | null;
  firstname: string | null;
  lastname: string | null;
  age: number | null;
  birth: {
    date: string | null;
    place: string | null;
    country: string | null;
  };
  nationality: string | null;
  height: string | null;
  weight: string | null;
  injured: boolean | null;
  photo: string | null;
}
