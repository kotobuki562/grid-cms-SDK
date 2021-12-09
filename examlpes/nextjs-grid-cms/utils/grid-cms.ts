import { createClient } from "grid-cms-sdk/dist";

const client = createClient({
  email: "email",
  privateKey: "privateKey",
});

export default client;
