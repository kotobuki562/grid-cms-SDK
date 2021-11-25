import { JWT } from "google-auth-library";
import { Client } from "./type";

export const createClient = (client: Client): JWT => {
  const scopes = [
    "https://www.googleapis.com/auth/spreadsheets.readonly",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
  ];
  const jwt = new JWT({
    email: client.email,
    key: client.privateKey,
    scopes,
  });
  return jwt;
};
