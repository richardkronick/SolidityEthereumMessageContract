const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
 
const { abi, evm } = require('./compile');
 
// Replace the values of the two variables below.
// The first is a seed phrase, the second is an Infura node endpoint.
provider = new HDWalletProvider(
  'YOUR_MNEMONIC',
  'YOUR_INFURA_URL'
);
 
const web3 = new Web3(provider);
 
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
 
  console.log('Attempting to deploy from account', accounts[0]);
 
  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['Howdy my friend!'] })
    .send({ gas: '1000000', from: accounts[0] });
 
  console.log('The contract was deployed to', result.options.address);
  provider.engine.stop();
};
 
deploy();