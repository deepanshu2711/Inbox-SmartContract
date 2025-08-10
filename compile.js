// compile code will go here
// solidity compiler

// require("./contracts/Inbox.sol") //bad because it through it was js code so it can throw errors

import path from "path";
import fs from "fs";
import solc from "solc";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // Current file
const __dirname = path.dirname(__filename); // Current folder

// __dirname is a constant that is defined by node that always get set to the current working directory
const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const suorce = fs.readFileSync(inboxPath, "utf8");

//we also have to specify the number of differnt contracts we are goinig to compile
export const compiledInBoxContract = solc.compile(suorce, 1).contracts[
  ":Inbox"
];
