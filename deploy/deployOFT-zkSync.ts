import { chains } from '../config/config'

export const deployZkOFT = async (chain, name, symbol) => {

    if (chain != chains.zkSync_sepolia) {
        throw Error(`not allowed to deploy OFT.`)
    }

    const contract = await chain.contractFactory.deploy(name, symbol, chain.lzConfig.endpointV2, chain.wallet.address)

    const receipt = await contract.deployed()

    console.log("contract deployed: " + receipt.address)

    return receipt.address
}