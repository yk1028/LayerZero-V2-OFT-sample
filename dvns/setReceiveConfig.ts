import { ethers } from "ethers";
const { chains } = require('../config/config');

// Send the transaction
async function setReceiveConfig(fromChain, toChain) {

  // Addresses
  const YOUR_ENDPOINT_CONTRACT_ADDRESS = fromChain.lzConfig.endpointV2;

  // Addresses

  // Configuration
  const ulnConfig = {
    confirmations: 1, // BigInt for uint64, replace with actual
    requiredDVNCount: 1, // Example value, replace with actual
    optionalDVNCount: 0, // Example value, replace with actual
    optionalDVNThreshold: 0, // Example value, replace with actual
    requiredDVNs: ['0x0747D0dabb284E5FBaEEeA427BBa7b2fba507120'], // Replace with actual addresses, must be in alphabetical order '0x000000000000000000000000000000000000dEaD', '0x0747D0dabb284E5FBaEEeA427BBa7b2fba507120'
    optionalDVNs: [], // Replace with actual addresses, must be in alphabetical order
  };

  // Provider and Signer
  const signer = fromChain.wallet;

  // ABI and Contract
  const endpointAbi = [
    'function setConfig(address oappAddress, address receiveLibAddress, tuple(uint32 eid, uint32 configType, bytes config)[] setConfigParams) external',
  ];
  const endpointContract = new ethers.Contract(YOUR_ENDPOINT_CONTRACT_ADDRESS, endpointAbi, signer);

  const configTypeUlnStruct =
    'tuple(uint64 confirmations, uint8 requiredDVNCount, uint8 optionalDVNCount, uint8 optionalDVNThreshold, address[] requiredDVNs, address[] optionalDVNs)';
  const encodedUlnConfig = ethers.AbiCoder.defaultAbiCoder().encode(
    [configTypeUlnStruct],
    [ulnConfig]
  );

  const setConfigParam = {
    eid: toChain.lzConfig.eid,
    configType: 2, // ULN_CONFIG_TYPE
    config: encodedUlnConfig,
  };

  try {
    const tx = await endpointContract.setConfig(
      fromChain.oftAddress,
      fromChain.lzConfig.receiveUln302, // 이곳 설정에 따라 receive, send 결정
      [setConfigParam]
    );

    console.log('Transaction sent:', tx.hash);
    const receipt = await tx.wait();
    console.log('Transaction confirmed:', receipt.hash);
  } catch (error) {
    console.error('Transaction failed:', error);
  }
}

setReceiveConfig(chains.cube, chains.sepolia);