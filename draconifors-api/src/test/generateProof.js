import chai from "chai";
import fetcher from "../utils/utils";
const assert = chai.assert;

// Before making the call to the proof generation API. 
describe("Proof generation routing test", () => {
    let route =  "http://draconifors_api:3001/generate-proof/"
    let data
    let res

    it("Should check for public signals and offchain validity of proof gen", async () => {
        data = { 
                    circuitName: "multiplier"
                    ,witnessInputs: {"a": "2", "b": "4"}
                }
        res = await fetcher(route,'POST', data)
        assert.equal('8', res.data.result.publicInputs[0]);
        assert.equal(true, res.data.result.valid);
    });
});
