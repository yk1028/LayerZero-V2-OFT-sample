# LayerZero V2 OFT sample
- LayerZero V2를 활용한 OFT 예시

## Chains & Contracts
- cube
  - XplaNativeOFTAdapter
- sepolia, bsc-testnet, zkSync-sepolia
  - XplaOFT

### Test
- main.ts에서 전체 실행 흐름 확인 가능

- ethers와 zksync-ethers 내부의 ethers 버전 차이로 `-f` 옵션 사용
```
npm i -f
``` 

- .env example
```
PRIVATE_KEY="{your private key}"

CUBE_OFT="{cube contaract address}"
BSC_OFT ="{bsc-testnet contaract address}"
SEPOLIA_OFT ="{sepolia contaract address}"
ZKSYNC_OFT="{zksync contaract address}"
```
  