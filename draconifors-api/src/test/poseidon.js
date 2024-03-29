import ganache from 'ganache-cli';
import Web3 from 'web3';
import chai from 'chai';
import contract from '../../contracts/poseidon.json';
import { createHash } from '../utils/poseidonHash';

const { assert } = chai;

// Before making the call to the poseidon API.
describe('Poseidon Smart contract test', () => {
  let web3;
  let poseidon;
  let accounts;
  let randomHex;

  before(async () => {
    web3 = new Web3(ganache.provider(), null, { transactionConfirmationBlocks: 1 });
    accounts = await web3.eth.getAccounts();
  });

  it('Should deploy the Poseidon contract', async () => {
    const C = new web3.eth.Contract(contract.abi);

    poseidon = await C.deploy({
      data: contract.bytecode,
    }).send({
      gas: 2500000,
      from: accounts[0],
    });
  });

  it('Should calculate the Poseidon hash correctly', async () => {
    randomHex = 5;

    const res = await poseidon.methods.poseidon([randomHex]).call();

    const hash = createHash(6, 8, 57, 'poseidon');

    const res2 = hash([randomHex]);

    assert.equal(res.toString(), res2.toString());
  });

  it('Should calculate the gas cost of Poseidon, for 1 bit, 512 bits and 1536 bits, correctly', async () => {
    const gasAmount = await poseidon.methods.poseidon([1]).estimateGas({});
    const gasCostA = gasAmount / 3; // 512
    const gasCostB = gasAmount / 6; // 256
    const gasCostC = gasAmount / 1536; // 1 bit
    assert.isBelow(gasCostC, gasCostB);
    assert.isBelow(gasCostB, gasCostA);
  });
});
