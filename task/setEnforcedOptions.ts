import { Options } from "@layerzerolabs/lz-v2-utilities";
import { chains } from "../config/config";

const SEND = 1; // a standard token transfer via send()
const SEND_AND_CALL = 2; // a composed token transfer via send()
const LZ_OPTION = Options.newOptions().addExecutorLzReceiveOption(100000, 0).toHex().toString()

const generateEnforcedOptions = (targetChain) => {
    const options = []
    for (const chain in chains) {
        if (chains[chain] != targetChain) {
            options.push({ eid: chains[chain].lzConfig.eid, msgType: SEND, options: LZ_OPTION })
            options.push({ eid: chains[chain].lzConfig.eid, msgType: SEND_AND_CALL, options: LZ_OPTION })
        }
    }

    return options
}

export const setEnforcedOptions = async (chain) => {

    const options = generateEnforcedOptions(chain)

    const tx = await chain.oftContract.setEnforcedOptions(options)
    
    const receipt = await tx.wait()

    console.log(receipt)
}

setEnforcedOptions(chains.zkSync_sepolia)