import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";

import { compiledInBoxContract } from "./compile.js";

// deploy code will go here

const provider = new HDWalletProvider(
  process.emnv.MNEMONIC,
  "https://sepolia.infura.io/v3/7cdf2205165f4127b76051a6331e5e1b",
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("accounts", accounts);
  const result = await new web3.eth.Contract(
    JSON.parse(compiledInBoxContract.interface),
  )
    .deploy({ data: compiledInBoxContract.bytecode, arguments: ["Hi there!"] })
    .send({ gas: "2000000", from: accounts[0] });

  console.log("contract deployed to ", result.options.address);

  provider.engine.stop();
};

deploy();
