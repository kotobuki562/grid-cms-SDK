import { createClient } from "../src";
import { parseJson } from "../src/utils/createJson";
import { createUri } from "../src/utils/fetcher";
import { pagenation } from "../src/utils/pagenation";
import {
  result,
  sheetData,
  page1result,
  page2result,
  page4result,
} from "./mock/json";

test("createClientすると返り値のemailが引数のemailと一致する", () => {
  const client = createClient({
    email: "aaa@gmail.com",
    privateKey: "private_key",
  });
  expect(client.email).toBe("aaa@gmail.com");
});

test("配列のシートデータをJSONにできる", () => {
  const colms = sheetData[0];

  const json = parseJson<any>(sheetData, colms);
  console.log(JSON.stringify(json, null, 2));

  expect(json).toEqual(result);
});

test("ページネーションが機能するか確認", () => {
  const page1 = pagenation({
    contents: result,
    limit: 5,
    offset: 0,
  });
  const page2 = pagenation({
    contents: result,
    limit: 5,
    offset: 1,
  });
  const page4 = pagenation({
    contents: result,
    limit: 5,
    offset: 3,
  });
  expect(page1).toEqual(page1result);
  expect(page2).toEqual(page2result);
  expect(page4).toEqual(page4result);
});

test("queriesが存在する場合はpagenationデータを返す", () => {
  const colms = sheetData[0];
  const contents = parseJson<any>(sheetData, colms);
  const response = (queries: boolean) => {
    if (queries) {
      const page1 = pagenation({
        contents: result,
        limit: 5,
        offset: 0,
      });
      return {
        contents: page1,
        colms,
      };
    }
    return { contents, colms };
  };
  expect(response(true)).toEqual({
    contents: page1result,
    colms,
  });
  expect(response(false)).toEqual({
    contents,
    colms,
  });
});

test("createUriで正確なuriの形になるか", () => {
  const getSheetUri = createUri("getSheet", {
    spreadsheetId: "spreadsheetId",
    range: "range",
  });
  const getSheetsUrl = createUri("getSheets", {
    spreadsheetId: "spreadsheetId",
  });

  expect(getSheetUri).toBe(
    "https://sheets.googleapis.com/v4/spreadsheets/spreadsheetId/values/range"
  );
  expect(getSheetsUrl).toBe(
    "https://sheets.googleapis.com/v4/spreadsheets/spreadsheetId/values:batchGetByDataFilter"
  );
});
