Grid CMS is a Headress CMS service that uses Google Sheets. All data can be managed in spreadsheets and is simple. Make CMS simpler.

This package is a fetcher library for grid-cms

### [What is Grid CMS?](https://grid-cms.vercel.app/)

### [Grid CMS Tutorial](https://grid-cms.vercel.app/grid)

# 1. begin grid-cms-SDK

```
npm i grid-cms-sdk
// or //
yarn add grid-cms-sdk
```

# 2. create-client

```index.ts
import { createClient } from "grid-cms-sdk/dist";

const client = createClient({
  email: "YOUR_GOOGLE_SERVICE_ACCOUNT_EMAIL",
  privateKey: "YOUR_GOOGLE_PRIVATE_KEY",
});

```

# 3. get sheet data for Next.js SSG

The image below is sample data.

![sample](https://user-images.githubusercontent.com/67810971/146659925-7c0ff57b-6971-478b-bfcd-496e8ff15159.png)

## `Basic`

```index.ts
import { getSheet } from "grid-cms-sdk/dist";
import { client } from "src/gridCMS"

export const getStaticProps = async () => {
  const res = await getSheet<any>(
    client,
    {
      spreadsheetId: "SPREAD_SHEET_ID",
      range: "SHEET_NAME",
    }
  );

  return {
    props: {
      result: res.contents,
      total: res.totalCount,
    }
  };
};

```

## `Pagination`

```index.ts
import { getSheet } from "grid-cms-sdk/dist";
import { client } from "src/gridCMS"

export const getStaticProps = async () => {
  const res = await getSheet<any>(
    client,
    {
      spreadsheetId: "SPREAD_SHEET_ID",
      range: "SHEET_NAME",
    },
    {
      pagenation: {
        limit: 5 // Number of data to be displayed per page,
        offset: 0 // Current number of pages minus 1,
      },
    }
  );

  return {
    props: {
      result: res.contents,
      total: res.totalCount,
    }
  };
};

```

## `Multiple contents`

```index.ts
import { getSheet } from "grid-cms-sdk/dist";
import { client } from "src/gridCMS"

export const getStaticProps = async () => {
  const results = await getSheets(
    client,
    {
      spreadsheetId: "SPREAD_SHEET_ID",
      ranges: ["sheet1", "sheet2", "sheet3"],
    },
    // Any option
    {
      pagenation: {
        limit: 5,
        offset: 0,
      },
    }
  );

  return {
    props: {
      results
    }
  };
};

```

# Request

| Name           | Required | Types                                                                                                                             | rescription                                                                                                                                                                       |
| -------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `createClient` | ✅       | `Client:{ email: string, privateKey: string }`                                                                                    | `email`: Your Google Service Account email. <br> `privateKey`: Your Google Service Account private_key.                                                                           |
| `getSheet`     | ✅       | `Client, Option: { spreadsheetId: string; range: string; }, queries?: { pagenation: { limit: number; offset: number; } }`         | `spreadsheetId`: Your spreadsheet ID.<br>`range`: Your shpreadsheet sheet name.<br>`limit`: Number of data to be displayed per page.<br>`offset`: Current number of pages minus 1 |
| `getSheets`    | ✅       | `Client, Option: { spreadsheetId: string; ranges: Array<string>; }, queries?: { pagenation: { limit: number; offset: number; } }` | `ranges`: Your shpreadsheet sheet names.                                                                                                                                          |

# Response

| Name           | Required | Types                                                            | rescription                                                                                                                                                                                                                                                                                    |
| -------------- | -------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `createClient` | -        | JWT                                                              | JWT class in google auth library.                                                                                                                                                                                                                                                              |
| `getSheet`     | -        | `contents: T[];`<br>`colms: string[];`<br>`totalCount: number;`  | `contents`: If you add a type argument to the getSheet API, it will be returned as an array of the attached type.<br>`colms`: Return the first row of data with the spreadsheet.<br>`totalCount`: Total number of contents.                                                                    |
| `getSheets`    | -        | `Array{ contents: any[]; colms: string[]; totalCount: number; }` | `contents`: Return data from the second row onward for each spreadsheet specified in ranges as JSON.<br>`colms`: Returns a string array of the first row of data for each spreadsheet specified by ranges.<br>`totalCount`: Total number of contents for each spreadsheet specified in ranges. |
