import { JWT } from "google-auth-library";
import { ResponseSheetData, Option, ResponseGoogleApiByRange } from "./type";
import { parseJson } from "./utils/createJson";
import { createUri } from "./utils/fetcher";

export const getSheet = async <T>(
  client: JWT,
  option: Option
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
    return { contents, colms };
  } else {
    throw new Error("Not Found sheet rows");
  }
};
