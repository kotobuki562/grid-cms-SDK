import { JWT } from "google-auth-library";
import {
  ResponseSheetData,
  Option,
  ResponseGoogleApiByRange,
  Pagenation,
} from "./type";
import { parseJson } from "./utils/createJson";
import { createUri } from "./utils/fetcher";
import { pagenation } from "./utils/pagenation";

export const getSheet = async <T>(
  client: JWT,
  option: Option,
  queries?: {
    pagenation: Pagenation;
  }
): Promise<ResponseSheetData<T>> => {
  const accessToken = await client.getAccessToken();

  const res = await fetch(createUri("getSheet", option), {
    headers: {
      Authorization: `Bearer ${accessToken.token}`,
      Accept: "application/json",
    },
  });

  const data: ResponseGoogleApiByRange = await res.json();

  const rows = data.values;

  if (rows.length > 0) {
    const [colms] = rows.slice(0, 1).map((row) => {
      return row;
    });
    const contents = parseJson<T>(rows, colms);
    if (queries) {
      const { limit, offset } = queries.pagenation;
      const pageItems = pagenation<T>({
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
    return { contents, colms, totalCount: contents.length };
  } else {
    throw new Error("Not Found sheet rows");
  }
};
