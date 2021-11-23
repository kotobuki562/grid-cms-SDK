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
    email: process.env.NEXT_PUBLIC_GCP_EMAIL,
    key: process.env.NEXT_PUBLIC_GCP_PRIVATE_KEY,
    scopes,
  });
  return jwt;
};
