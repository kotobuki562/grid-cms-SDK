import { JWT } from "google-auth-library";
import { ResponseSheetData, Option } from "./type";

export const getSheet = async <T>(
  client: JWT,
  option: Option
): Promise<ResponseSheetData<T>> => {
  const accessToken = await client.getAccessToken();

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${option.spreadsheetId}/values/${option.range}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken.token}`,
        Accept: "application/json",
      },
    }
  );
  const data: {
    range: string;
    majorDimension: string;
    values: any[][];
  } = await res.json();

  const rows = data.values;

  if (rows.length > 0) {
    /// rpows[0]の値を展開して、それを返す
    const [colms] = rows.slice(0, 1).map((row) => {
      return row;
    });
    // forを使ってkeysをキーにして、それを返す
    const contents: T[] = [];
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
    return { contents, colms };
  } else {
    throw new Error("Not Found sheet rows");
  }
};
