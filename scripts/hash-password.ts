import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { hashPassword } from "../lib/auth-password";

async function main() {
  const rl = createInterface({ input: stdin, output: stdout });
  const password = await rl.question("Choose an admin password: ");
  rl.close();

  if (!password.trim()) {
    console.error("Password cannot be empty.");
    process.exit(1);
  }

  const hash = await hashPassword(password);
  console.log("\nSet this as ADMIN_PASSWORD_HASH in your environment:\n");
  console.log(hash);
  console.log("");
}

main();
