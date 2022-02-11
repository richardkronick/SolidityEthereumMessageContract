const path = require('path');
const fs = require('fs');
const solc = require('solc');
 
const contractPath = path.resolve(__dirname, 'contracts', 'MessageContract.sol');
const source = fs.readFileSync(contractPath, 'utf8');
 
const input = {
  language: 'Solidity',
  sources: {
    'MessageContract.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};
 
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  'MessageContract.sol'
].MessageContract;