# ARES

## Milestones
- [ ] milestone M1:
    - [ ] Implements Poseidon hash in Solidity
    - [ ] Experiments with Poseidon hash in Circom with examples
    - [ ] Experiments with KimLeeOh Snarkjs implementation with examples
    - [ ] Implements Radish circuits in Circom with Poseidon hash and KimLeeOh protocol
    - [ ] Creates docker containers for Circom and Snarkjs and architectures Ares
    - [ ] Compares Poseidon hash to SHA256 used in Radish now (number of constraints and gas gos)
    - [ ] Compares KimLeeOh to GM17 used in Radish now (proof generation time, proof size, verification time, (updatable) setup size)
- [ ] milestone M2:
    - [ ] Implements BLS12-377 curve in Snarkjs
    - [ ] Implements a mapping tool from Snarkjs to Zexe (proof and vk formats)
    - [ ] Implements a multiple proof composition in Zexe (n proofs on BLS12-377 --> 1 proof on SW6)
    - [ ] Implements a verifier smart contract for SW6 proof (template + script connected to Zexe)
    - [ ] Tests SW6 with EIP1962 and Geth/Parity integration
- [ ] milestone M3:
    - [ ] Implements HG6 curve in Zexe
    - [ ] Adapts M2 to HG6
    - [ ] Modify EIP1962 and tests

## References
- [Poseidon hash](https://eprint.iacr.org/2019/458.pdf) circuit and contract on [circomlib](https://github.com/iden3/circomlib)
- [KimLeeOh protocol](https://eprint.iacr.org/2019/586.pdf) on [snarkjs](https://github.com/iden3/snarkjs/tree/master/src)
- BLS12-377 curve implementations in [Rust](https://github.com/scipr-lab/zexe/tree/master/algebra/src) and [C++](https://github.com/EYBlockchain/zk-swap-libff/tree/ey/libff/algebra/curves/bls12_377).
- Zexe [G16 implementation](https://github.com/scipr-lab/zexe/tree/master/groth16/src) (Nearly identical to KimLeeOh proof and vk formats)
- [Template example](https://github.com/iden3/snarkjs/blob/master/templates/verifier_kimleeoh.sol) of KimLeeOh verifier contract on alt-bn128 curve.
- EIP1962 implementations in [Rust](https://github.com/matter-labs/eip1962) and [C++](https://github.com/matter-labs/eip1962_cpp)
- Tests of EIP1962 on [Parity+Waffle](https://github.com/matter-labs/eip1962_lib/tree/v0.9) and [Geth+Truffle](https://github.com/matter-labs/eip1962_lib/tree/v0.9).
- HG6 curve [paper]().
