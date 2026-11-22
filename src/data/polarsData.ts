import rawData from './polarsData.json';
import type { PolarsCommand } from '../types/polars';

export type {
  CommandParameter,
  CommandType,
  DataRow,
  PolarsCommand,
  VisualizerAnimationType,
} from '../types/polars';

export const POLARS_COMMANDS: PolarsCommand[] = rawData as PolarsCommand[];

export const POLARS_CATEGORIES: string[] = [
  'ทั้งหมด',
  ...Array.from(new Set(POLARS_COMMANDS.map((cmd) => cmd.category))),
];
