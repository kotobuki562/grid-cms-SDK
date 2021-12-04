import type { Option, UsageApi } from "../type";

const ENDPOINT = "https://sheets.googleapis.com/v4/spreadsheets";

export const createUri = (
  usage: UsageApi,
  option: {
    spreadsheetId: Option["spreadsheetId"];
    range?: Option["range"];
  }
) => {
  const { spreadsheetId, range } = option;
  switch (usage) {
    case "getSheet":
      return `${ENDPOINT}/${spreadsheetId}/values/${range}`;
    case "getSheets":
      return `${ENDPOINT}/${spreadsheetId}/values:batchGetByDataFilter`;
    default:
      return "";
  }
};
