include "../../node_modules/circomlib/circuits/binsum.circom";

template Uint32Add(n) {
  signal input nums_bits[n][32];
  signal output out_bits[32];

  component sum = BinSum(32, n);
  var i;
  var j;
  for (i = 0; i < n; i++) {
    for (j = 0; j < 32; j++) {
      sum.in[i][j] <== nums_bits[i][j];
    }
  }

  for (j = 0; j < 32; j++) {
    out_bits[j] <== sum.out[j];
  }
}

template HashLeftRight() {
  signal input left;
  signal input right;

  signal output hash;

  component hasher = MiMCSponge(2, 1);
  left ==> hasher.ins[0];
  right ==> hasher.ins[1];
  hasher.k <== 0;

  hash <== hasher.outs[0];
}