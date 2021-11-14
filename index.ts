import { google, sheets_v4 } from "googleapis";

type Props = {
  email: string;
  privateKey: string;
  refreshToken: string;
  spreadsheetId: string;
  range: string;
};

export const createClient = ({
  email,
  privateKey,
}: {
  email: string;
  privateKey: string;
}): sheets_v4.Sheets => {
  const scopes = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
  const jwt = new google.auth.JWT({
    email: email,
    key: privateKey,
    scopes,
  });

  return google.sheets({ version: "v4", auth: jwt });
};

export const getSheet = async ({
  email,
  privateKey,
  spreadsheetId,
  range,
}: Props): Promise<{ contents: any[]; colms: string[] }> => {
  const scopes = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
  const jwt = new google.auth.JWT({
    email: email,
    key: privateKey,
    scopes,
  });

  const sheets = google.sheets({ version: "v4", auth: jwt });
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range,
    });

    const rows = response.data.values;

    if (rows) {
      /// rpows[0]の値を展開して、それを返す
      const [colms] = rows.slice(0, 1).map((row) => {
        return row;
      });
      // forを使ってkeysをキーにして、それを返す
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
                throw new Error(e);
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
    throw new Error(e);
  }
  return { contents: [], colms: [] };
};
