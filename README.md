# LayerZero V2 OFT sample
- LayerZero V2를 활용한 NativeOFT 및 OFT 예시

## Chains & Contracts
- cube
  - XplaNativeOFTAdapter
- sepolia, bsc-testnet, zkSync-sepolia
  - XplaOFT

## Compile
- compile.ts를 실행하여 contracts 디렉토리 내의 컨트랙트 컴파일 가능
- 이름으로 파일 지정
- 하단 주석 제거 후 실행

## Test
- ethers와 zksync-ethers 내부의 ethers 버전 차이로 `-f` 옵션 사용
  ```
  npm i -f
  ```

- .env.example 참고하여 .env 설정 필요

- `./step`에 실행 순서 예시
  ```
  1. deployAll
  2. settings
  3. sendFromCubeToSepolia
  4. sendFromSepiliaToCube
  ```

- dvn 설정은 `./dvn`에 따로 작성


