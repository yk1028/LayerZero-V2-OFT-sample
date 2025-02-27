import { ethers } from "ethers";

import { chains } from '../config/config'

export const setPeer = async (fromChain, toChain) => {

    const receipt = await (await fromChain.oftContract.setPeer(toChain.lzConfig.eid, ethers.zeroPadValue(toChain.oftAddress, 32))).wait()
    console.log(`\n[setPeer ${fromChain.name} -> ${toChain.name}]`)
    console.log(receipt)
}
