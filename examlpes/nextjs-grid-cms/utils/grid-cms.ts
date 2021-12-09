import { createClient } from "grid-cms-sdk/dist";

const client = createClient({
  email: process.env.NEXT_PUBLIC_EMAIL as string,
  privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY as string,
});

export default client;
