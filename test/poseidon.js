const ganache = require("ganache-cli");
const Web3 = require("web3");
const chai = require("chai");
const contract = require("../contracts/poseidon.json");
const PoseidonHashing = require("../ares-api/src/utils/poseidonHash");
const assert = chai.assert;

// Before making the call to the poseidon API. 
describe("Poseidon Smart contract test", () => {
    let web3;
    let poseidon;
    let accounts;
    let randomHex

    before(async () => {
        web3 = new Web3(ganache.provider(), null, { transactionConfirmationBlocks: 1 });
        accounts = await web3.eth.getAccounts();
    });


    it("Should deploy the Poseidon contract", async () => {
        const C = new web3.eth.Contract(contract.abi);

        poseidon = await C.deploy({
            data: contract.bytecode
        }).send({
            gas: 2500000,
            from: accounts[0]
        })
    });

    it("Shold calculate the Poseidon hash correctly", async () => {
        randomHex = 5

        const res = await poseidon.methods.poseidon([randomHex]).call();

        const hash = PoseidonHashing.createHash(6, 8, 57);

        const res2 = hash([randomHex]);

        assert.equal(res.toString(), res2.toString());
    });

    it("Should calculate the gas cost of Poseidon, for 1 bit, 512 bits and 1536 bits, correctly", async () => {
        await (poseidon.methods.poseidon([randomHex])).estimateGas({}, function(error, gasAmount){
            let gasCostA =  gasAmount/3 //512
            let gasCostB =  gasAmount/6 //256 
            let gasCostC =  gasAmount/1536 //1 bit
            assert.isBelow(gasCostC, gasCostB )
            assert.isBelow(gasCostB, gasCostA )

        });
    })
});

