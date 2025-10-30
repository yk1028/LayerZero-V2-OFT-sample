import { Contract, ContractFactory, ethers, Transaction, Wallet } from "ethers"
// import { Contract as zkContract, ContractFactory as zkContractFactory, Wallet as zkWallet, Provider as zkProvider } from "zksync-ethers"

// import mainet_config from './layerzero-v2-deployments-mainnet.json'
import testnet_config from './layerzero-v2-deployments-testnet.json'
import dotenv from "dotenv";

import XplaOFTAbi from "../artifacts/XplaOFT/abi.json"
import XplaOFTBytecode from "../artifacts/XplaOFT/bytecode.json"
import XplaNativeOFTAdapterAbi from "../artifacts/XplaNativeOFTAdapter/abi.json"
import XplaNativeOFTAdapterBytecode from "../artifacts/XplaNativeOFTAdapter/bytecode.json"
import zkXplaOFTAbi from "../artifacts/zk-XplaOFT/abi.json"
import zkXplaOFTBytecode from "../artifacts/zk-XplaOFT/bytecode.json"

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (
    !PRIVATE_KEY
    || !process.env.CUBE_RPC
    || !process.env.BSC_RPC
    || !process.env.SEPOLIA_RPC
    || !process.env.ZKSYNC_RPC
) {
    throw new Error("Please check .env file!");
}

const cubeWallet = new Wallet(
    PRIVATE_KEY,
    new ethers.JsonRpcProvider(process.env.CUBE_RPC)
)

const bscWallet = new Wallet(
    PRIVATE_KEY,
    new ethers.JsonRpcProvider(process.env.BSC)
)

const sepoliaWallet = new Wallet(
    PRIVATE_KEY,
    new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC)
)

const zkSyncWallet = new Wallet(
    PRIVATE_KEY,
    new ethers.JsonRpcProvider(process.env.ZKSYNC_RPC)
)

const cubeOFT = ethers.getAddress(process.env.CUBE_OFT)
const bscOFT = ethers.getAddress(process.env.BSC_OFT)
const sepoliaOFT = ethers.getAddress(process.env.SEPOLIA_OFT)
const zkSyncOFT = ethers.getAddress(process.env.ZKSYNC_OFT)

export const chains = {
    cube: {
        name: "cube",
        wallet: cubeWallet,
        lzConfig: testnet_config['XPLA-Testnet'],
        contractFactory: new ContractFactory(XplaNativeOFTAdapterAbi, XplaNativeOFTAdapterBytecode.bytecode, cubeWallet),
        oftContract: new Contract(cubeOFT, XplaNativeOFTAdapterAbi, cubeWallet),
        oftAddress: cubeOFT,
    },
    bsctest: {
        name: "bsc testnet",
        wallet: bscWallet,
        lzConfig: testnet_config['BNB-Smart-Chain-Testnet'],
        contractFactory: new ContractFactory(XplaOFTAbi, XplaOFTBytecode.bytecode, bscWallet),
        oftContract: new Contract(bscOFT, XplaOFTAbi, bscWallet),
        oftAddress: bscOFT
    },
    sepolia: {
        name: "sepolia",
        wallet: sepoliaWallet,
        lzConfig: testnet_config['Ethereum-Sepolia-Testnet'],
        contractFactory: new ContractFactory(XplaOFTAbi, XplaOFTBytecode.bytecode, sepoliaWallet),
        oftContract: new Contract(sepoliaOFT, XplaOFTAbi, sepoliaWallet),
        oftAddress: sepoliaOFT
    },
    zkSync_sepolia: {
        name: "zkSync sepolia",
        wallet: zkSyncWallet,
        lzConfig: testnet_config['zkSync-Sepolia-Testnet'],
        contractFactory: new ContractFactory(zkXplaOFTAbi, zkXplaOFTBytecode.bytecode, zkSyncWallet),
        oftContract: new Contract(zkSyncOFT, zkXplaOFTAbi, zkSyncWallet),
        oftAddress: zkSyncOFT
    }
}
