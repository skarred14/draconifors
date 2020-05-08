import chai from "chai";
import fetcher from "../utils/utils";
const assert = chai.assert;

// Before making the call to the proof generation API. 
describe("Binary addition test", () => {
    let route =  "http://draconifors_api:3001/generate-proof/"
    let data
    let res

    it("Should generate proof", async () => {
        data = { 
                    circuitName: "Uint32Add"
                    ,witnessInputs: {"a": "2"}
                }
        res = await fetcher(route,'POST', data)
        console.log(res.data);
        assert.equal('8', res.data.result.publicInputs[0]);
        assert.equal(true, res.data.result.valid);
    });
});
