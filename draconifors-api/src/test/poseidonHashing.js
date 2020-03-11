import chai from 'chai';
import fetcher from '../utils/utils';

const { assert } = chai;

// Before making the call to the poseidon API.
describe('Poseidon Hashing routing test', () => {
  const route = 'http://draconifors_api:3001/poseidon/';
  let data;
  let res;

  it('Should check constrain of hash([1, 2])', async () => {
    data = {
      t: 6,
      nRoundsF: 8,
      nRoundsP: 57,
      seed: 'poseidon',
      element: [1, 2],
    };
    res = await fetcher(route, 'POST', data);
    assert.equal(
      '12242166908188651009877250812424843524687801523336557272219921456462821518061',
      res.data.result,
    );
  });

  it('Should check constrain of hash([3, 4])', async () => {
    data = {
      t: 6,
      nRoundsF: 8,
      nRoundsP: 57,
      seed: 'poseidon',
      element: [3, 4],
    };

    res = await fetcher(route, 'POST', data);
    assert.equal(
      '17185195740979599334254027721507328033796809509313949281114643312710535000993',
      res.data.result,
    );
  });
});
