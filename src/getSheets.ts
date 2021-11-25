import { JWT } from "google-auth-library";
import { ResponseGoogleApiSheets, Option, ResponseSheetsData } from "./type";

export const getSheets = async (
  client: JWT,
  option: Omit<Option, "range"> & { ranges: string[] }
): Promise<ResponseSheetsData[]> => {
  const accessToken = await client.getAccessToken();
  const getData = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${option.spreadsheetId}/values:batchGetByDataFilter`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken.token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        dataFilters: option.ranges.map((range) => {
          return {
            a1Range: range,
          };
        }),
      }),
    }
  );
  const batchData: ResponseGoogleApiSheets = await getData.json();

  const batchDataValues = batchData.valueRanges.map((range) => {
    return range.valueRange.values;
  });

  const result = batchDataValues.map((row) => {
    return row.map((col) => {
      return col;
    });
  });

  const resultRows = result.map((rows) => {
    const [colms] = rows.slice(0, 1).map((row) => {
      return row;
    });

    const contents: any[] = [];
    for (const row of rows.slice(1, rows.length)) {
      const obj: any = {};
      for (let i = 0; i < row.length; i++) {
        obj[colms[i]] = row[i];
      }
      // オブジェクトのキーに、"JSON"の文字列があれば、JSON.parseして、それを返す
      contents.push(
        // obj
        Object.keys(obj).reduce((acc: any, key: string) => {
          if (key.includes("JSON")) {
            try {
              acc[key] = JSON.parse(obj[key]);
            } catch (e) {
              throw new Error("JSON parse error");
            }
          } else {
            acc[key] = obj[key];
          }
          return acc;
        }, {})
      );
    }
    return {
      colms,
      contents,
    };
  });
  return resultRows;
};
