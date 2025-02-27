import { chains } from "./config/config"
import { deployNativeOFTAdapter } from "./deploy/deployNativeOFT"
import { deployOFT } from "./deploy/deployOFT"
import { deployZkOFT } from "./deploy/deployOFT-zkSync"
import { sendFromNativeOFT } from "./task/sendFromNativeOFT"
import { sendFromOFT } from "./task/sendFromOFT"
import { setEnforcedOptions } from "./task/setEnforcedOptions"
import { setPeer } from "./task/setPeers"

const deployAll = async () => {
    await deployNativeOFTAdapter(chains.cube, "18")
    await deployOFT(chains.sepolia, "test Xpla OFT (sepolia)", "tXPLA0")
    await deployOFT(chains.bsctest, "test Xpla OFT (bsc-testnet)", "tXPLA0")
    await deployZkOFT(chains.zkSync_sepolia, "test Xpla OFT (zkSync sepolia)", "tXPLA0")
}

// 전체 실행 절차
const main = async () => {

    // 1.depoly
    // await deployAll()

    // 2번 진행전에 .env에 1에서 배포한 oft 주소 등록 필요

    // 2.setPeer
    await setPeer(chains.cube, chains.sepolia)
    await setPeer(chains.cube, chains.bsctest)
    await setPeer(chains.cube, chains.zkSync_sepolia)

    await setPeer(chains.sepolia, chains.cube)
    await setPeer(chains.sepolia, chains.bsctest)
    await setPeer(chains.sepolia, chains.zkSync_sepolia)

    // bnb public rpc의 경우 연속해서 전송시 안되는 경우 존재
    await setPeer(chains.bsctest, chains.cube)
    await setPeer(chains.bsctest, chains.sepolia)
    await setPeer(chains.bsctest, chains.zkSync_sepolia)

    await setPeer(chains.zkSync_sepolia, chains.cube)
    await setPeer(chains.zkSync_sepolia, chains.sepolia)
    await setPeer(chains.zkSync_sepolia, chains.zkSync_sepolia)

    // 3.setEnforcedOptions
    await setEnforcedOptions(chains.cube)
    await setEnforcedOptions(chains.sepolia)
    await setEnforcedOptions(chains.bsctest)
    await setEnforcedOptions(chains.zkSync_sepolia)

    // 4. sendFrom
    // cube에서 전송시 사용
    await sendFromNativeOFT(chains.cube, chains.sepolia, "1")
    
    // 나머지 체인에서 전송시 사용
    await sendFromOFT(chains.sepolia, chains.bsctest, "1")
}

main()