import { createClient } from "../src";
import { parseJson } from "../src/utils/createJson";
import { createUri } from "../src/utils/fetcher";

test("createClientすると返り値のemailが引数のemailと一致する", () => {
  const client = createClient({
    email: "aaa@gmail.com",
    privateKey: "private_key",
  });
  expect(client.email).toBe("aaa@gmail.com");
});

test("配列のシートデータをJSONにできる", () => {
  const tagJSONstring = `{
  "tags": [
    {
      "id": 1,
      "name": "writer1"
    },
    {
      "id": 2,
      "name": "writer2"
    },
    {
      "id": 3,
      "name": "writer3"
    }
  ]
}`;
  const sheetData = [
    ["id", "title", "category", "tagJSON", "description"],
    ["1", "title1", "category1", tagJSONstring, "description1"],
    ["2", "title2", "category2", tagJSONstring, "description2"],
    ["3", "title3", "category3", tagJSONstring, "description3"],
  ];
  const colms = sheetData[0];

  const result = [
    {
      id: "1",
      title: "title1",
      category: "category1",
      tagJSON: {
        tags: [
          {
            id: 1,
            name: "writer1",
          },
          {
            id: 2,
            name: "writer2",
          },
          {
            id: 3,
            name: "writer3",
          },
        ],
      },
      description: "description1",
    },
    {
      id: "2",
      title: "title2",
      category: "category2",
      tagJSON: {
        tags: [
          {
            id: 1,
            name: "writer1",
          },
          {
            id: 2,
            name: "writer2",
          },
          {
            id: 3,
            name: "writer3",
          },
        ],
      },
      description: "description2",
    },
    {
      id: "3",
      title: "title3",
      category: "category3",
      tagJSON: {
        tags: [
          {
            id: 1,
            name: "writer1",
          },
          {
            id: 2,
            name: "writer2",
          },
          {
            id: 3,
            name: "writer3",
          },
        ],
      },
      description: "description3",
    },
  ];
  const json = parseJson<any>(sheetData, colms);

  expect(json).toEqual(result);
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
