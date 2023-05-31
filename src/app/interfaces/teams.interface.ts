export interface Teams {
  get: string;
  parameters: [];
  errors: [];
  results: number;
  response: [{ team: Team; venue: {} }];
}

export interface Team {
  id: number;
  name: string;
  code: string;
  country: string;
  founded: number;
  logo: string;
  national?: boolean;
}

export interface Statistics {
  get: string;
  parameters: [];
  errors: [];
  results: number;
  response: {
    fixtures: Fixture;
    goals: Goals;
    lineups: Lineup[];
  };
}

export interface Statistic {
  fixtures: Fixture;
  goals: GoalsPerMinute;
  lineups: Lineup[];
}

export interface Goals {
  for: GoalsPerMinute;
}

export interface GoalsPerMinute {
  minute: {
    '0-15': {
      total: number | null;
      percentage: string | null;
    };
    '16-30': {
      total: number | null;
      percentage: string | null;
    };
    '31-45': {
      total: number | null;
      percentage: string | null;
    };
    '46-60': {
      total: number | null;
      percentage: string | null;
    };
    '61-75': {
      total: number | null;
      percentage: string | null;
    };
    '76-90': {
      total: number | null;
      percentage: string | null;
    };
    '91-105': {
      total: number | null;
      percentage: string | null;
    };
    '106-120': {
      total: number | null;
      percentage: string | null;
    };
  };
}

export interface Lineup {
  formation: string;
  played: number;
}

export interface Fixture {
  played: {
    total: number;
  };
  wins: {
    total: number;
  };
  draws: {
    total: number;
  };
  loses: {
    total: number;
  };
}
