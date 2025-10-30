import { ethers } from "ethers";
const { chains } = require('../config/config');


const ulnconfig_abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_oapp",
                "type": "address"
            },
            {
                "internalType": "uint32",
                "name": "_remoteEid",
                "type": "uint32"
            }
        ],
        "name": "getUlnConfig",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint64",
                        "name": "confirmations",
                        "type": "uint64"
                    },
                    {
                        "internalType": "uint8",
                        "name": "requiredDVNCount",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "optionalDVNCount",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "optionalDVNThreshold",
                        "type": "uint8"
                    },
                    {
                        "internalType": "address[]",
                        "name": "requiredDVNs",
                        "type": "address[]"
                    },
                    {
                        "internalType": "address[]",
                        "name": "optionalDVNs",
                        "type": "address[]"
                    }
                ],
                "internalType": "struct UlnConfig",
                "name": "rtnConfig",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]


const getUlnConfig = async (fromChain, toChain) => {

    const sendUln302Contract = new ethers.Contract(fromChain.lzConfig.sendUln302, ulnconfig_abi, fromChain.wallet)
    const receiveUln302Contract = new ethers.Contract(fromChain.lzConfig.receiveUln302, ulnconfig_abi, fromChain.wallet)

    const sendConfig = await sendUln302Contract.getUlnConfig(fromChain.oftAddress, toChain.lzConfig.eid)


    console.log(`[${toChain.name} - sendUln302 config]`)
    console.log("confirmations:", sendConfig[0])
    console.log("requiredDVNCount:", sendConfig[1])
    console.log("optionalDVNCount:", sendConfig[2])
    console.log("optionalDVNThreshold:", sendConfig[3])
    console.log("requiredDVNs:", sendConfig[4])
    console.log("optionalDVNs:", sendConfig[5])
    console.log("")


    const receiveConfig = await receiveUln302Contract.getUlnConfig(fromChain.oftAddress, toChain.lzConfig.eid)
    console.log(`[${toChain.name} - receiveUln302 config]`)
    console.log("confirmations:", receiveConfig[0])
    console.log("requiredDVNCount:", receiveConfig[1])
    console.log("optionalDVNCount:", receiveConfig[2])
    console.log("optionalDVNThreshold:", receiveConfig[3])
    console.log("requiredDVNs:", receiveConfig[4])
    console.log("optionalDVNs:", receiveConfig[5])
    console.log("")

}

getUlnConfig(chains.cube, chains.sepolia);
// getUlnConfig(chains.sepolia, chains.cube);
