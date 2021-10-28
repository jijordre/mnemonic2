#!/usr/bin/env node

const bip39 = require('bip39');
const { hdkey } = require('ethereumjs-wallet')

const mnemonic = process.env.MNEMONIC || 'test test test test test test test test test test test junk';
const accounts = process.env.ACCOUNTS ? parseInt(process.env.ACCOUNTS) : 1
const pathBase = process.env.HD_PATH_BASE || 'm/44\'/60\'/0\'/0'

const masterSeed = bip39.mnemonicToSeedSync(mnemonic);
const hdwallet = hdkey.fromMasterSeed(masterSeed);

for (let i = 0; i < accounts; i++) {
    const path = `${pathBase}/${i}`;
    const wallet = hdwallet.derivePath(path).getWallet();
    const address = `0x${wallet.getAddress().toString('hex')}`;
    const privateKey = `0x${wallet.getPrivateKey().toString('hex')}`;

    console.log(`Account #${i}: ${address}`);
    console.log(`Private Key: ${privateKey}`);
    console.log()
}
