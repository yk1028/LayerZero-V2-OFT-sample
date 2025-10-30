import { ethers } from "ethers";

export const setSendConfig = async (fromChain, toChain, ulnConfig) => {

  // Addresses
  const YOUR_ENDPOINT_CONTRACT_ADDRESS = fromChain.lzConfig.endpointV2;

  const signer = fromChain.wallet;

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
