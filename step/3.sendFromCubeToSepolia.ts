import { chains } from "../config/config"
import { sendFromNativeOFT } from "../task/sendFromNativeOFT"

// 전체 실행 절차
const sendFromCubeToSepolia = async () => {
    // cube에서 전송시 사용
    console.log("sendFromNativeOFT from cube to sepolia")
    const amount = "1234"
    await sendFromNativeOFT(chains.cube, chains.sepolia, "1")
    
}

sendFromCubeToSepolia()