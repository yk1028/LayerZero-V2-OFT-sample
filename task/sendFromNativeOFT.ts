import { ethers } from "ethers";

export const sendFromNativeOFT = async (fromChain, toChain, amount) => {

    const fromContract = fromChain.oftContract

    const amountToSend = ethers.parseEther(amount)

    const sendParam = [
        toChain.lzConfig.eid,
        ethers.zeroPadValue(toChain.wallet.address, 32),
        amountToSend,
        amountToSend,
        '0x',
        '0x',
        '0x',
    ]

    // Fetching the native fee for the token send operation
    const [nativeFee] = await fromContract.quoteSend(sendParam, false)

    console.log("native fee:" + nativeFee)

    // const msgValue = nativeFee.add(await cubeContract.removeDust(amountToSend)) 
    // https://docs.ethers.org/v6/migrating/
    const msgValue = nativeFee + amountToSend

    // Executing the send operation from myNativeOFTAdapter contract
    const tx = await fromContract.send(sendParam, [nativeFee, 0], toChain.wallet.address, { value: msgValue })
    
    const receipt = await tx.wait()

    console.log(receipt)
}

