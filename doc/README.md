# Poseidon hash in Circom

## HADES strategy
Poseidon hash is based on the [Hades design family](https://eprint.iacr.org/2019/1107.pdf).

![Alt](img/poseidon.svg)

Where:
- `ARK(.)` is Add-round key: Addition of a constant
- `S` is S-Box composition: Application of a bijective function
- `M(.)` is a linear transformation: Multiplication by a constant matrix

The number of rounds is `R=2*Rf+Rp` where `Rf` is a full round (`t` S-Boxes) and `Rp` is a partial round (`1` S-Box).

## Parameters choice
We want a Poseidon hash inside an alt-bn128 based SNARK circuit to work with Ethereum. Hashing inside the SNARK means working in the prime field of the alt-bn128 subgroup of size `p`.
- the SNARK field `p=21888242871839275222246405745257275088548364400416034343698204186575808495617`
- `ARK` round keys should be random. In the [paper](https://eprint.iacr.org/2019/458.pdf) and the corresponding [implementation](https://extgit.iaik.tugraz.at/krypto/hadeshash/tree/master), the authors use the [Grain LFSR](https://link.springer.com/chapter/10.1007/978-3-540-68351-3_14) in a self-shrinking mode. In [circom implementation](https://github.com/iden3/circomlib/blob/master/circuits/poseidon.circom), the authors use recursive [blake2b](https://blake2.net) hashes of the `seed = 'poseidon'`.
- `S` is a bijective function. The paper proposes and discuss `x^3`, `x^5` or `x^(-1)`. For the `p`-field `x^3` is not bijective (`p%2 != 3`) so we choose `x^5` (bijective since `p % 5 != 1`) resulting in 3 R1CS per S-Box (`x*x=x^2`, `x*x^2=x^3` and `x^2*x^3=x^5`).
- The `t x t` matrix `M(.)` should be Maximum Distance Separable (MDS). The authors propose a [Cauchy matrix](https://en.wikipedia.org/wiki/Cauchy_matrix) construction. Circom initiate the the Cauchy matrix with the blake2b hash of the `seed = poseidon`.
- Security analysis of the paper and the choice of `p` suggest that for a 128-bit security (+margin) the parameters should be: `t=6`, `Rf=8`, `Rp=57`

## Results
It follows that the number of R1CS is `3*t*Rf+3*Rp` for a `x^5`-based Poseidon hash (The `ARK(.)` constant addition and `M(.)` constant matrix multiplication can be incorporated in the `S` R1CS). Given that `t=6` and hashing field `GF(p)` the input should be chunks of `t*log2(p) = 1536` bits. For the use-case we are interested in is follows that the number of R1CS is `3*6*8+3*57 = 315` per `1536`, say less that `0.3` constraint per bit.

Note that the `ARK(.)` and `M(.)` can be hardcoded following the values [here](./hardcoded-values.txt).

## References
- [Paper](https://eprint.iacr.org/2019/458.pdf).
- Implementations: [python](https://gist.github.com/HarryR/f6fadd2c524f61727742002a9221a550), [js](https://github.com/iden3/circomlib/blob/master/src/poseidon.js), [c++](https://extgit.iaik.tugraz.at/krypto/hadeshash/blob/master/code/cpp_1536_24_x3_pf/hash_1536_24_x3_pf.cpp) (different field), [sagemath](https://extgit.iaik.tugraz.at/krypto/hadeshash/tree/master/code) (different field).
