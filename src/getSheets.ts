import { JWT } from "google-auth-library";
import {
  ResponseGoogleApiSheets,
  Option,
  ResponseSheetsData,
  Pagenation,
} from "./type";
import { parseJson } from "./utils/createJson";
import { createUri } from "./utils/fetcher";
import { pagenation } from "./utils/pagenation";

export const getSheets = async (
  client: JWT,
  option: Omit<Option, "range"> & { ranges: string[] },
  queries?: {
    pagenation: Pagenation;
  }
): Promise<ResponseSheetsData[]> => {
  const accessToken = await client.getAccessToken();
  const getData = await fetch(
    createUri("getSheets", {
      spreadsheetId: option.spreadsheetId,
    }),
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

    const contents = parseJson<any>(rows, colms);

    if (queries) {
      const { limit, offset } = queries.pagenation;
      const pageItems = pagenation({
        contents,
        limit,
        offset,
      });
      return {
        contents: pageItems,
        colms,
        totalCount: contents.length,
      };
    }

    return {
      colms,
      contents,
      totalCount: contents.length,
    };
  });
  return resultRows;
};
