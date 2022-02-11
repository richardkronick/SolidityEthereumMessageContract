const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
 
const { abi, evm } = require('../compile');
 
let accounts;
let messageContract;
 
beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  messageContract = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: ['Howdy my friend!'],
    })
    .send({ from: accounts[0], gas: '1000000' });
});
 
describe('MessageContract', () => {
  it('successfully deploys a contract', () => {
    assert.ok(messageContract.options.address);
  });
  it('contains a default message', async () => {
    const message = await messageContract.methods.message().call();
    assert.equal(message, 'Howdy my friend!');
  });
  it('can modify the message', async () => {
    await messageContract.methods.setMessage('see ya!').send({ from: accounts[0] });
    const message = await messageContract.methods.message().call();
    assert.equal(message, 'see ya!');
  });
});