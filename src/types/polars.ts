export type CommandType = 'Method' | 'Function' | 'Expression';

export type VisualizerAnimationType =
  | 'filter_rows'
  | 'drop_nulls'
  | 'add_column'
  | 'deduplicate'
  | 'sort_rows'
  | 'transform_values'
  | 'select_col';

export interface CommandParameter {
  name: string;
  desc: string;
}

export interface DataRow {
  id: string;
  [key: string]: string | number | null;
}

export interface PolarsCommand {
  id: string;
  name: string;
  type: CommandType;
  category: string;
  keywords: string[];
  summary: string;
  signature: string;
  parameters: CommandParameter[];
  code: string;
  animationType: VisualizerAnimationType;
  datasetTitle: string;
  columns: string[];
  initialRows: DataRow[];
  resultRows: DataRow[];
  highlightCol?: string;
  mascotTipTh?: string;
}
