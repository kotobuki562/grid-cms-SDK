Grid CMS is a Headress CMS service that uses Google Sheets. All data can be managed in spreadsheets and is simple. Make CMS simpler.

This package is a fetcher library for grid-cms

1. begin grid-cms-SDK

```
npm i grid-cms-sdk
// or //
yarn add grid-cms-sdk
```

2. create-client

```index.ts
import { createClient } from "grid-cms-sdk/dist";

const client = createClient({
  email: /// Your google service account ///,
  privateKey: /// Your google key ///,
});

```

3. get sheet data for Next.js SSR

get [contents] -> JSON
get [colms] -> string[]

```index.ts
import { getSheet, getSheets } from "grid-cms-sdk/dist";
import { client } from "src/gridCMS"

export const getServerSideProps = async () => {
  const res = await getSheet<any>(client, {
    spreadsheetId: /// Your spreadsheet ID ///,
    range: /// Your spreadsheet name ///,
  });

  const resSheets = await getSheets(client, {
    spreadsheetId: /// Your spreadsheet ID ///,
    ranges: [/// Your spreadsheet names ///],
  });

  return {
    props: {
      res: {
        contents: res.contemts,
        colms: res.colms.
      },
      resSheets
    },
  };
};

// resSheets is "res" Array

```
