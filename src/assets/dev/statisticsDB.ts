import { Statistic } from 'src/app/interfaces/teams.interface';

export const StatisticsDB: Statistic = {
  fixtures: {
    played: {
      total: 38,
    },
    wins: {
      total: 11,
    },
    draws: {
      total: 14,
    },
    loses: {
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
  lineups: [
    {
      formation: '4-2-3-1',
      played: 36,
    },
    {
      formation: '4-3-1-2',
      played: 2,
    },
  ],
};
