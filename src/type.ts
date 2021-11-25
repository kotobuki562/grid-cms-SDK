export interface Client {
  email: string;
  privateKey: string;
}

export interface Option {
  spreadsheetId: string;
  range: string;
}

export interface ResponseSheetData<T> {
  contents: T[];
  colms: string[];
}

export interface ResponseSheetsData {
  contents: any[];
  colms: string[];
}

export interface ResponseGoogleApiSheets {
  spreadsheetId: string;
  valueRanges: {
    dataFilters: {
      a1Range: string;
    }[];
    valueRange: {
      majorDimension: string;
      range: string;
      values: any[][];
    };
  }[];
}
