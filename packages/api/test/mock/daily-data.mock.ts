import { random, times } from 'lodash';
import moment from 'moment';
import { DeepPartial } from 'typeorm';
import { DailyData } from '../../src/sites/daily-data.entity';
import { SofarLiveDataDto } from '../../src/sites/dto/live-data.dto';
import { Site } from '../../src/sites/sites.entity';
import { SpotterData } from '../../src/utils/sofar.types';
import { athensSite, californiaSite } from './site.mock';

const getMockDailyData = (
  date: string,
  site: DeepPartial<Site>,
): DeepPartial<DailyData> => ({
  avgBottomTemperature: random(15, 35, true),
  avgWaveHeight: random(10, true),
  avgWindSpeed: random(10, true),
  dailyAlertLevel: random(4),
  degreeHeatingDays: random(70, true),
  date,
  site,
  maxBottomTemperature: random(15, 35, true),
  minBottomTemperature: random(15, 35, true),
  maxWaveHeight: random(10, true),
  minWaveHeight: random(10, true),
  maxWindSpeed: random(10, true),
  minWindSpeed: random(10, true),
  satelliteTemperature: random(15, 35, true),
  topTemperature: random(15, 35, true),
  waveMeanDirection: random(359),
  waveMeanPeriod: random(10),
  weeklyAlertLevel: random(4),
  windDirection: random(359),
});

export const getMockLiveData = (siteId: number): SofarLiveDataDto => ({
  site: { id: siteId },
  dailyAlertLevel: random(4),
  weeklyAlertLevel: random(4),
  bottomTemperature: {
    timestamp: moment().toISOString(),
    value: random(15, 35, true),
  },
  topTemperature: {
    value: random(15, 35, true),
    timestamp: moment().toISOString(),
  },
  satelliteTemperature: {
    timestamp: moment().toISOString(),
    value: random(15, 35, true),
  },
  degreeHeatingDays: {
    timestamp: moment().toISOString(),
    value: random(70, true),
  },
  waveHeight: {
    timestamp: moment().toISOString(),
    value: random(10, true),
  },
  waveMeanDirection: {
    timestamp: moment().toISOString(),
    value: random(359),
  },
  waveMeanPeriod: {
    timestamp: moment().toISOString(),
    value: random(10),
  },
  windSpeed: {
    timestamp: moment().toISOString(),
    value: random(10, true),
  },
  windDirection: {
    timestamp: moment().toISOString(),
    value: random(359),
  },
  sstAnomaly: random(15, 35, true),
  spotterPosition: {
    latitude: {
      timestamp: moment().toISOString(),
      value: random(15, 35, true),
    },
    longitude: {
      timestamp: moment().toISOString(),
      value: random(15, 35, true),
    },
  },
});

export const getMockSpotterData = (
  startDate: Date,
  endDate: Date,
): SpotterData => {
  const start = moment(startDate);
  const end = moment(endDate);
  const diffDays = end.diff(start, 'days');

  return {
    bottomTemperature: times(diffDays, (i) => ({
      timestamp: start.clone().add(i, 'days').toISOString(),
      value: random(15, 35, true),
    })),
    topTemperature: times(diffDays, (i) => ({
      timestamp: start.clone().add(i, 'days').toISOString(),
      value: random(15, 35, true),
    })),
    significantWaveHeight: times(diffDays, (i) => ({
      timestamp: start.clone().add(i, 'days').toISOString(),
      value: random(15, 35, true),
    })),
    waveMeanPeriod: times(diffDays, (i) => ({
      timestamp: start.clone().add(i, 'days').toISOString(),
      value: random(15, 35, true),
    })),
    waveMeanDirection: times(diffDays, (i) => ({
      timestamp: start.clone().add(i, 'days').toISOString(),
      value: random(359),
    })),
    windSpeed: times(diffDays, (i) => ({
      timestamp: start.clone().add(i, 'days').toISOString(),
      value: random(10, true),
    })),
    windDirection: times(diffDays, (i) => ({
      timestamp: start.clone().add(i, 'days').toISOString(),
      value: random(359),
    })),
    latitude: times(diffDays, (i) => ({
      timestamp: start.clone().add(i, 'days').toISOString(),
      value: random(-90, 90, true),
    })),
    longitude: times(diffDays, (i) => ({
      timestamp: start.clone().add(i, 'days').toISOString(),
      value: random(-180, 180, true),
    })),
    barometerTop: times(diffDays, (i) => ({
      timestamp: start.clone().add(i, 'days').toISOString(),
      value: random(900, 1100, true),
    })),
    barometerBottom: times(diffDays, (i) => ({
      timestamp: start.clone().add(i, 'days').toISOString(),
      value: random(900, 1100, true),
    })),
    barometricTopDiff: [],
    surfaceTemperature: times(diffDays, (i) => ({
      timestamp: start.clone().add(i, 'days').toISOString(),
      value: random(900, 1100, true),
    })),
  };
};

export const californiaDailyData: DeepPartial<DailyData>[] = times(10, (i) => {
  const dataDate = moment().subtract(i, 'd').endOf('day').toISOString();
  return getMockDailyData(dataDate, californiaSite);
});

export const athensDailyData: DeepPartial<DailyData>[] = times(10, (i) => {
  const dataDate = moment().subtract(i, 'd').endOf('day').toISOString();
  return getMockDailyData(dataDate, athensSite);
});

export const dailyData = [...californiaDailyData, ...athensDailyData];
