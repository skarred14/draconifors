# Poseidon hash in Circom SNARK circuit
Example of poseidon hash pre-image knowledge SNARK proof in Circom.

## Organization
- `./`: circom files
    - `poseidon.circom`: SNARK circuit for 1 input up to 1536 bits (can be modified up to 6 inputs `var chunks = 6;`)
    - `input.json`: inputs values should be of the form `{"inputs":["in_1",...,"in_N"]}`

## Run
`./do <command>`
Possible commands: `clean`, `compile`, `setup`, `witness`, `prove`, `verify`
- `./do clean`: removes `circuit.json`, `proving_key.json`, `verification_key.json`, `witness.json`, `public.json` adn `proof.json`. 
- `./do compile`: compile `citcuit.circom` into `circuit.json`
- `./do setup`: generates the keys `proving_key.json` and `verification_key.json`
- `./do witness`: generates the `witness.json` that has all the intermediate values
- `./do prove`: generates the `proof.json` and the `public.json` input
- `./do verify`: outputs OK if the proof is verified or INVALID otherwise

