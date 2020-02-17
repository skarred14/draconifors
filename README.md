# Draconifors

## Milestones
- [ ] milestone M1:
    - [x] Poseidon hash in Solidity
        - [x] Implements Poseidon hash in Solidity
        - [x] gas cost of the implementation
    - [x] Experiments with Poseidon hash in Circom with examples
    - [x] Experiments with KimLeeOh Snarkjs implementation with examples
    - [ ] Implements Radish circuits in Circom with Poseidon hash and KimLeeOh protocol
    - [ ] Creates docker containers for Circom and Snarkjs and architectures draconifors
        - [x] Docker build process clean-up
        - [x] Run setup and compile as a part of watch process
        - [x] Update readme for adding new circuits
        - [ ] Add routes for proof generation
    - [ ] Compares Poseidon hash to SHA256 used in Radish now (number of constraints and gas gos)
        - [x] Explanation doc of Poseidon hash
        - [x] Number of R1CS comparison
        - [ ] Gas cost comparison
    - [ ] Compares KimLeeOh to GM17 used in Radish now (proof generation time, proof size, verification time, (updatable) setup size)
        - [ ] proof generation time: GM17 vs KimLeeOh
            - [ ] numbers of operations (theory)
            - [ ] timing of snarkjs poseidon circuit proving (implementation)
            - [ ] timing of snarkjs Radish circuit proving (implementation)
        - [ ] proof size: GM17 vs KimLeeOh
        - [ ] verification time: GM17 vs KimLeeOh
            - [ ] numbers of operations (theory)
            - [ ] timing of snarkjs verification (implementation)
        - [ ] setup size: GM17 vs KimLeeOh
            - [ ] numbers of operations (theory)
            - [ ] snarkjs poseidon circuit setup size (implementation)
            - [ ] snarkjs Radish setup size (implementation)
            - [ ] updatable setup
                - [ ] explanation and use in Radish
                - [ ] implementation

- [ ] milestone M2:
    - [ ] Implements BLS12-377 curve in Snarkjs
        - [x] implement and test fields algebra
        - [x] implement and test curve algebra
        - [x] implement and test pairing computation
        - [ ] test to compile, setup, prove verify a proof with KimLeeOh
    - [ ] Implements a mapping tool from Snarkjs to zexey
        - [ ] map snarkjs proof to zexey input
        - [ ] map snarkjs verification key to zexey input
    - [ ] Implements a multiple proof composition in Zexe (n proofs on BLS12-377 --> 1 proof on SW6)
    - [ ] Implements a verifier smart contract for SW6 proof
        - [ ] template
        - [ ] automatic script connected to zexey
    - [ ] Tests SW6 with EIP1962 and Geth/Parity integration
        - [ ] EIP1962 test
        - [ ] Geth integration
        - [ ] Parity integration

- [ ] milestone M3:
    - [ ] Implements HG6 curve
        - [ ] implement in C++ *zk-swap-libff*
        - [ ] implement in Rust *zexey*
    - [ ] Adapts M2 to HG6
        - [ ] multiple proof composition
        - [ ] verifier smart contract
        - [ ] Modify EIP1962 and tests

- [ ] milestone M4:
    - [ ] implement MPC trusted setup for Radish34 (HG6/KimLeeOh)
      - [ ] implement code for MPC powers of tau on HG6 curve
      - [ ] implement code for MPC Radish34 KimLeeOh polynomials on HG6 curve
## Prerequisites

1.  Install [Docker for Mac](https://www.docker.com/docker-mac)

1.  Install and start [dotdocker](https://github.com/aj-may/dotdocker)

    `dotdocker start`)

## Development/Test environment

1. Run `docker-compose up -d` to run the draconifors containers. Alternately, run `docker-compose up` to watch the logs of the `draconifors-api` and `draconifors-api-watch` containers

1. All circom circuits in `draconifors-api/circuits/*.circom` are auto-compiled and auto setup using the circom npm library and setup using "Kimleeoh" proving scheme. Corresponding outputs are captured as `draconifors-api/artifacts/*.json` files. The circuits are auto-compiled and setup during watch process in `draconifors-api-watch` container

1. To re-run the circuit compilation process, add a circuit to `draconifors-api/circuits/`. Then run `docker-compose restart && docker-compose logs -f draconifors-api-watch` to get the logs of the build process. For development convenience, the test circuits from the circom repo have been added to `draconifors-api/circuits/`

1. To reset the process, run `make duke-nukem` at the root of the directory

## Troubleshooting

1. If reset doesn't work, run `docker-compose system prune -f && docker-compose build --no-cache && docker-compose up -d`

## References
- [Poseidon hash](https://eprint.iacr.org/2019/458.pdf) circuit and contract on [circomlib](https://github.com/iden3/circomlib)
- [KimLeeOh protocol](https://eprint.iacr.org/2019/586.pdf) on [snarkjs](https://github.com/iden3/snarkjs/tree/master/src)
- BLS12-377 curve implementations in [Rust](https://github.com/scipr-lab/zexe/tree/master/algebra/src) and [C++](https://github.com/EYBlockchain/zk-swap-libff/tree/ey/libff/algebra/curves/bls12_377).
- Zexe [G16 implementation](https://github.com/scipr-lab/zexe/tree/master/groth16/src) (Nearly identical to KimLeeOh proof and vk formats)
- [Template example](https://github.com/iden3/snarkjs/blob/master/templates/verifier_kimleeoh.sol) of KimLeeOh verifier contract on alt-bn128 curve.
- EIP1962 implementations in [Rust](https://github.com/matter-labs/eip1962) and [C++](https://github.com/matter-labs/eip1962_cpp)
- Tests of EIP1962 on [Parity+Waffle](https://github.com/matter-labs/eip1962_lib/tree/v0.9) and [Geth+Truffle](https://github.com/matter-labs/eip1962_lib/tree/v0.9).
- HG6 curve [paper]().
- MPC trusted setup [paper](https://eprint.iacr.org/2017/1050.pdf) and code ([Rust](https://github.com/kobigurk/phase2-bn254/), [C++](https://github.com/AztecProtocol/Setup))
