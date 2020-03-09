/* eslint-disable no-useless-concat */
/* eslint-disable no-plusplus */
import zkSnark from 'snarkjs';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import '@babel/polyfill';

const readFile = promisify(fs.readFile);

export default async fileInput => {
  const vkVerifierStr = JSON.parse(
    await readFile(path.resolve(__dirname, '../../artifacts', `${fileInput}_vk_verifier.json`)),
    'utf8',
  );
  const vkVerifier = zkSnark.unstringifyBigInts(vkVerifierStr);

  let template = await readFile(
    path.resolve(__dirname, '../../contracts/templates', 'verifier_kimleeoh_bn128.template.sol'),
    'utf8',
  );

  const vkalfa1Str =
    `${vkVerifier.vk_alfa_1[0].toString()},` + `${vkVerifier.vk_alfa_1[1].toString()}`;
  template = template.replace('<%vk_alfa1%>', vkalfa1Str);

  const vkbeta2Str =
    `[${vkVerifier.vk_beta_2[0][1].toString()},` +
    `${vkVerifier.vk_beta_2[0][0].toString()}], ` +
    `[${vkVerifier.vk_beta_2[1][1].toString()},` +
    `${vkVerifier.vk_beta_2[1][0].toString()}]`;
  template = template.replace('<%vk_beta2%>', vkbeta2Str);

  const vkgamma2Str =
    `[${vkVerifier.vk_gamma_2[0][1].toString()},` +
    `${vkVerifier.vk_gamma_2[0][0].toString()}], ` +
    `[${vkVerifier.vk_gamma_2[1][1].toString()},` +
    `${vkVerifier.vk_gamma_2[1][0].toString()}]`;
  template = template.replace('<%vk_gamma2%>', vkgamma2Str);

  const vkdelta2Str =
    `[${vkVerifier.vk_delta_2[0][1].toString()},` +
    `${vkVerifier.vk_delta_2[0][0].toString()}], ` +
    `[${vkVerifier.vk_delta_2[1][1].toString()},` +
    `${vkVerifier.vk_delta_2[1][0].toString()}]`;
  template = template.replace('<%vk_delta2%>', vkdelta2Str);

  // The points

  template = template.replace('<%vk_input_length%>', (vkVerifier.IC.length - 1).toString());
  template = template.replace('<%vk_ic_length%>', vkVerifier.IC.length.toString());
  let vi = '';
  for (let i = 0; i < vkVerifier.IC.length; i++) {
    if (vi !== '') vi += '        ';
    vi =
      `${vi}vk.IC[${i}] = Pairing.G1Point(${vkVerifier.IC[i][0].toString()},` +
      `${vkVerifier.IC[i][1].toString()});\n`;
  }
  template = template.replace('<%vk_ic_pts%>', vi);

  return template;
};
