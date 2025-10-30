import { chains } from "../config/config"
import { sendFromOFT } from "../task/sendFromOFT"

// 전체 실행 절차
const sendFromSepoliaToCube = async () => {

    // 3. sendFrom
    // sepolia에서 전송시 사용
    console.log("sendFromNativeOFT from sepolia to cube")
    const amount = "1"
    await sendFromOFT(chains.sepolia, chains.cube, amount)
}

sendFromSepoliaToCube()