import { chains } from "../config/config"
import { setEnforcedOptions } from "../task/setEnforcedOptions"
import { setPeer } from "../task/setPeers"

// 전체 실행 절차
const main = async () => {

    // 진행전에 .env에 oft 주소 등록 필요 (deployAll.ts 실행하여 oft 배포)

    await setPeer(chains.cube, chains.sepolia)
    await setPeer(chains.sepolia, chains.cube)

    // 4개의 체인 연결시 예시
    // cube
    // await setPeer(chains.cube, chains.sepolia)
    // await setPeer(chains.cube, chains.bsctest)
    // await setPeer(chains.cube, chains.zkSync_sepolia)

    // sepolia
    // await setPeer(chains.sepolia, chains.cube)
    // await setPeer(chains.sepolia, chains.bsctest)
    // await setPeer(chains.sepolia, chains.zkSync_sepolia)

    // bsc-testnet
    // // bnb public rpc의 경우 연속해서 전송시 안되는 경우 존재
    // await setPeer(chains.bsctest, chains.cube)
    // await setPeer(chains.bsctest, chains.sepolia)
    // await setPeer(chains.bsctest, chains.zkSync_sepolia)

    // zkSync-sepolia
    // await setPeer(chains.zkSync_sepolia, chains.cube)
    // await setPeer(chains.zkSync_sepolia, chains.sepolia)
    // await setPeer(chains.zkSync_sepolia, chains.zkSync_sepolia)

    // 2.setEnforcedOptions
    await setEnforcedOptions(chains.cube)
    await setEnforcedOptions(chains.sepolia)
    // await setEnforcedOptions(chains.bsctest)
    // await setEnforcedOptions(chains.zkSync_sepolia)
}

main()