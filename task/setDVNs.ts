
import { setSendConfig } from "./setSendConfig";
import { setReceiveConfig } from "./setReceiveConfig";

export const setDVNs = async (fromChain, toChain) => {

  // Configuration
  const cubeUlnConfig = {
    confirmations: 1, // BigInt for uint64, replace with actual
    requiredDVNCount: 1, // Example value, replace with actual
    optionalDVNCount: 0, // Example value, replace with actual
    optionalDVNThreshold: 0, // Example value, replace with actual
    requiredDVNs: ['0x0747D0dabb284E5FBaEEeA427BBa7b2fba507120'], // Replace with actual addresses, must be in alphabetical order '0x000000000000000000000000000000000000dEaD', '0x0747D0dabb284E5FBaEEeA427BBa7b2fba507120'
    optionalDVNs: [], // Replace with actual addresses, must be in alphabetical order
  };

  console.log(`\n[setSendConfig ${fromChain.name} -> ${toChain.name}]`)
  await setSendConfig(fromChain, toChain, cubeUlnConfig)

  console.log(`\n[setReceiveConfig ${fromChain.name} -> ${toChain.name}]`)
  await setReceiveConfig(fromChain, toChain, cubeUlnConfig)



  const sepoliaUlnConfig = {
    confirmations: 1, // BigInt for uint64, replace with actual
    requiredDVNCount: 1, // Example value, replace with actual
    optionalDVNCount: 0, // Example value, replace with actual
    optionalDVNThreshold: 0, // Example value, replace with actual
    requiredDVNs: ['0x8eebf8b423B73bFCa51a1Db4B7354AA0bFCA9193'], // Replace with actual addresses, must be in alphabetical order '0x000000000000000000000000000000000000dEaD', '0x0747D0dabb284E5FBaEEeA427BBa7b2fba507120'
    optionalDVNs: [], // Replace with actual addresses, must be in alphabetical order
  };

  console.log(`\n[setSendConfig ${toChain.name} -> ${fromChain.name}]`)
  await setSendConfig(toChain, fromChain, sepoliaUlnConfig)

  console.log(`\n[setReceiveConfig ${toChain.name} -> ${fromChain.name}]`)
  await setReceiveConfig(toChain, fromChain, sepoliaUlnConfig)
}