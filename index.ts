import { google, sheets_v4 } from "googleapis";

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
