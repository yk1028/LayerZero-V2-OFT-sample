import { chains } from "../config/config"
import { setEnforcedOptions } from "../task/setEnforcedOptions"
import { setPeer } from "../task/setPeers"

// 전체 실행 절차
const main = async () => {

    // 진행전에 .env에 oft 주소 등록 필요 (deployAll.ts 실행하여 oft 배포)

    await setPeer(chains.cube, chains.sepolia)
    await setPeer(chains.sepolia, chains.cube)

    // 2.setEnforcedOptions
    await setEnforcedOptions(chains.cube)
    await setEnforcedOptions(chains.sepolia)

    // 3.setDVNs
    await setDVNs(chains.cube, chains.sepolia)
    await setDVNs(chains.sepolia, chains.cube)

}

main()