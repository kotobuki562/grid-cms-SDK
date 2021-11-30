import { createClient } from "../src";

test("createClientすると返り値のemailが引数のemailと一致する", () => {
  const client = createClient({
    email: "aaa@gmail.com",
    privateKey: "private_key",
  });
  expect(client.email).toBe("aaa@gmail.com");
});
