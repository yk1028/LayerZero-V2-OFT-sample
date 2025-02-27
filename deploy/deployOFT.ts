import { chains } from '../config/config'

export const deployOFT = async (chain, name, symbol) => {

    if (chain == chains.cube || chain == chain.zkSync_sepolia) {
        throw Error(`not allowed to deploy OFT.`)
    }

    const contract = await chain.contractFactory.deploy(name, symbol, chain.lzConfig.endpointV2, chain.wallet.address)

    const receipt = await contract.waitForDeployment()

    console.log("contract deployed: " + receipt.target)

    return receipt.target
}