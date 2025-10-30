import { Options } from "@layerzerolabs/lz-v2-utilities";
import { chains } from "../config/config";

const ethers = require('ethers');

function generateDVNParams(_eid, _confirmations, _dvn) {
  
    // Encode UlnConfig using AbiCoder
    const configTypeUlnStruct =
      'tuple(uint64 confirmations, uint8 requiredDVNCount, uint8 optionalDVNCount, uint8 optionalDVNThreshold, address[] requiredDVNs, address[] optionalDVNs)';
  
  
    const ulnConfig = {
      confirmations: _confirmations, // Changed to BigInt
      requiredDVNCount: 1,
      optionalDVNCount: 0,
      optionalDVNThreshold: 0,
      requiredDVNs: [_dvn],
      optionalDVNs: [],
    };
  
    const encodedUlnConfig = ethers.AbiCoder.defaultAbiCoder().encode(
      [configTypeUlnStruct],
      [ulnConfig]
    );
  
    const params = {
      eid: _eid,
      configType: 2, // ULN_CONFIG_TYPE
      config: encodedUlnConfig,
    };
  
    return params
  }

export const setEnforcedOptions = async (chain) => {

    const params = generateDVNParams(chain.lzConfig.eid, 5, chain.wallet.address)

    console.log(params)

    // const tx = await chain.oftContract.setConfig(params)
    
    // const receipt = await tx.wait()

    // console.log(receipt)
}

setEnforcedOptions(chains.cube)