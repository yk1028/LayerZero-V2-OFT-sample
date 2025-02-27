import { ethers } from "ethers";
import { chains } from "../config/config";

export const sendFromOFT = async (fromChain, toChain, amount) => {

    const fromContract = fromChain.oftContract

    const tokensToSend = ethers.parseEther(amount)

    // Defining extra message execution options for the send operation
    // const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString()

    const sendParam = [
        toChain.lzConfig.eid,
        ethers.zeroPadValue(toChain.wallet.address, 32),
        tokensToSend,
        tokensToSend,
        '0x',
        '0x',
        '0x',
    ]

    // Fetching the native fee for the token send operation
    const [nativeFee] = await fromContract.quoteSend(sendParam, false)

    console.log("native fee:" + nativeFee)

    // Executing the send operation from myOFTA contract
    const tx = await fromContract.send(sendParam, [nativeFee, 0], toChain.wallet.address, { value: nativeFee })

    const receipt = await tx.wait()

    console.log(receipt)
}