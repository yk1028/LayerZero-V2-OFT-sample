import { chains } from "../config/config"
import { deployNativeOFTAdapter } from "../deploy/deployNativeOFT"
import { deployOFT } from "../deploy/deployOFT"
import { deployZkOFT } from "../deploy/deployOFT-zkSync"

// 전체 oft 배포
const deployAll = async () => {
    
    await deployNativeOFTAdapter(chains.cube, "18")
    console.log("cube NativeOFTAdapter deployed")

    await deployOFT(chains.sepolia, "test01 Xpla OFT (sepolia)", "tXPLA01")
    console.log("sepolia OFT deployed")

    // await deployOFT(chains.bsctest, "test01 Xpla OFT (bsc-testnet)", "tXPLA01")
    // console.log("bsc-testnet OFT deployed")
    // await deployZkOFT(chains.zkSync_sepolia, "test01 Xpla OFT (zkSync sepolia)", "tXPLA01")
    // console.log("zkSync sepolia OFT deployed")
}

deployAll()