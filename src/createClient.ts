import { JWT } from "google-auth-library";

export const createClient = ({
  email,
  privateKey,
}: {
  email: string;
  privateKey: string;
}): JWT => {
  const scopes = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
  const jwt = new JWT({
    email: email,
    key: privateKey,
    scopes,
  });
  return jwt;
};
