import * as path from 'path'
import * as fs from 'fs'

const CONTRACTS_PATH = "./contracts"

const compile = async (filename) => {

    const solc = require("solc");

    const fullFileName = filename + '.sol'
    const filePath = path.join(CONTRACTS_PATH, fullFileName)
    const source = fs.readFileSync(filePath, 'utf-8')

    const input = {
        language: 'Solidity',
        sources: {
            [fullFileName]: {
                content: source
            }
        },
        settings: {
            evmVersion: "paris",
            outputSelection: {
                '*': {
                    '*': ['evm', 'abi']
                }
            },
            optimizer: {
                enabled: true,
                runs: 200,
            }
        }
    };

    const output = await JSON.parse(await solc.compile(JSON.stringify(input), { import: findImports }));

    console.log(output)

    const bytecode = output.contracts[fullFileName][filename].evm.bytecode.object
    const bytecodejson = { "bytecode": bytecode }
    const abi = output.contracts[fullFileName][filename].abi

    fs.mkdirSync(`./artifacts/${filename}`)
    fs.writeFileSync(`./artifacts/${filename}/bytecode.json`, JSON.stringify(bytecodejson))
    fs.writeFileSync(`./artifacts/${filename}/abi.json`, JSON.stringify(abi))
}

function findImports(relativePath) {
    //my imported sources are stored under the node_modules folder!

    const absolutePath = path.resolve(__dirname, 'node_modules', relativePath);
    const source = fs.readFileSync(absolutePath, 'utf8');
    return { contents: source };

}

// 컴파일 실행 ./contracts 폴더 내 파일명 컴파일
compile("XplaNativeOFTAdapter");
