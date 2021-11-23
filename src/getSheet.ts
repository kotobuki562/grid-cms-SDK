import { JWT } from "google-auth-library";

export const getSheet = async <T>(
  client: JWT,
  {
    spreadsheetId,
    range,
  }: {
    spreadsheetId: string;
    range: string;
  }
): Promise<{ contents: T[]; colms: string[] }> => {
  try {
    const accessToken = await client.getAccessToken();
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data: {
      range: string;
      majorDimension: string;
      values: any[][];
    } = await response.json();

    const rows = data.values;

    if (rows) {
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
    }
  } catch (e) {
    throw new Error("error");
  }
  return { contents: [], colms: [] };
};
