import ganache from "ganache";
import { Web3 } from "web3";
import assert from "assert";

import { compiledInBoxContract } from "../compile.js";

//assert is a build in nodejs liberary

// updated ganache and web3 imports added for convenience

// contract test code will go here
// ganache/TestRPC is use to build local test network
// web3 is use to get a programatic access to a deployed contract to a blockchain

// web3 is used as absolute soluton to communicatineb3  between js app and etherum network
//we can make multiple instance of web3 liberary the purpose of each instance is to connect to multiple etherium network
//when ever we create a instance of web3 we need to do some configurations we need to provide something call provider
//provider is a communication layer webtween web3 liberary and some specific etharium network

//mocha is a test runuing framework We can use MOCA to test any type of JavaScript code that we want, so we can use it to test a frontend application , backend or etharium code

// function
// it => run the test and make an assertion
// describe => Groups together 'it' functions
// beforeeach => execute some general setup code

const web3 = new Web3(ganache.provider());

// class Car {
//   park() {
//     return "stopped";
//   }
//   drive() {
//     return "vroom";
//   }
// }
//
// let car;
//
// beforeEach(() => {
//   car = new Car();
// });
//
// describe("Car", () => {
//   it("It can park", () => {
//     assert.equal(car.park(), "stopped");
//   });
//   it("It can start", () => {
//     assert.equal(car.drive(), "vroom");
//   });
// });
//

let accounts;
let inbox;
const initialString = "Hi there!";
beforeEach(async () => {
  //Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  //use one of these account to deploy the contract
  inbox = await new web3.eth.Contract(
    JSON.parse(compiledInBoxContract.interface),
  )
    .deploy({
      data: compiledInBoxContract.bytecode,
      arguments: [initialString],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("depoloys a contract", () => {
    assert.ok(inbox.options.address);
  });
  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, initialString);
  });
  it("can change the message", async () => {
    await inbox.methods.setMessage("bye").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, "bye");
  });
});
