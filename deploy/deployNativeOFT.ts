import { chains } from '../config/config'

export const deployNativeOFTAdapter = async (chain, localDecimals) => {

    if (chain != chains.cube) {
        throw Error(`not allowed to deploy NativeOFTAdapter.`)
    }

    const contract = await chain.contractFactory.deploy(localDecimals, chain.lzConfig.endpointV2, chain.wallet.address)

    const receipt = await contract.waitForDeployment()

    console.log("contract deployed: " + receipt.target)

    return receipt.target
}