import { Statistic } from 'src/app/interfaces/teams.interface';

export const StatisticsDB: Statistic = {
  fixtures: {
    played: {
      home: 19,
      away: 19,
      total: 38,
    },
    wins: {
      home: 5,
      away: 6,
      total: 11,
    },
    draws: {
      home: 9,
      away: 5,
      total: 14,
    },
    loses: {
      home: 5,
      away: 8,
      total: 13,
    },
  },
  goals: {
    minute: {
      '0-15': {
        total: 4,
        percentage: '10.81%',
      },
      '16-30': {
        total: 3,
        percentage: '8.11%',
      },
      '31-45': {
        total: 4,
        percentage: '10.81%',
      },
      '46-60': {
        total: 6,
        percentage: '16.22%',
      },
      '61-75': {
        total: 8,
        percentage: '21.62%',
      },
      '76-90': {
        total: 10,
        percentage: '27.03%',
      },
      '91-105': {
        total: 2,
        percentage: '5.41%',
      },
      '106-120': {
        total: null,
        percentage: null,
      },
    },
  },
  lineups: [],
};
