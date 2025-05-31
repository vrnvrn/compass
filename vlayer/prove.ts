import { createVlayerClient } from "@vlayer/sdk";
import nftSpec from "../out/ExampleNFT.sol/ExampleNFT";
import tokenSpec from "../out/ExampleToken.sol/ExampleToken";
import {
  getConfig,
  createContext,
  deployVlayerContracts,
  waitForContractDeploy,
} from "@vlayer/sdk/config";

import proverSpec from "../out/SimpleProver.sol/SimpleProver";
import verifierSpec from "../out/SimpleVerifier.sol/SimpleVerifier";

const config = getConfig();
const {
  chain,
  ethClient,
  account: john,
  proverUrl,
  confirmations,
} = createContext(config);

if (!john) {
  throw new Error(
    "No account found. Make sure EXAMPLES_TEST_PRIVATE_KEY is set in your .env.testnet.local"
  );
}

const INITIAL_TOKEN_SUPPLY = BigInt(10_000_000);

const tokenDeployTransactionHash = await ethClient.deployContract({
  abi: tokenSpec.abi,
  bytecode: tokenSpec.bytecode.object,
  account: john,
  args: [john.address, INITIAL_TOKEN_SUPPLY],
});

const tokenAddress = await waitForContractDeploy({
  client: ethClient,
  hash: tokenDeployTransactionHash,
});

const nftDeployTransactionHash = await ethClient.deployContract({
  abi: nftSpec.abi,
  bytecode: nftSpec.bytecode.object,
  account: john,
  args: [],
});

const nftContractAddress = await waitForContractDeploy({
  client: ethClient,
  hash: nftDeployTransactionHash,
});

const { prover, verifier } = await deployVlayerContracts({
  proverSpec,
  verifierSpec,
  proverArgs: [tokenAddress],
  verifierArgs: [nftContractAddress],
});

console.log("Proving...");
const vlayer = createVlayerClient({
  url: proverUrl,
  token: config.token,
});

let result;
try {
  const hash = await vlayer.prove({
    address: prover,
    proverAbi: proverSpec.abi,
    functionName: "balance",
    args: [john.address],
    chainId: chain.id,
    gasLimit: config.gasLimit,
  });

  // DEBUGGING WRAP FOR API RESPONSE
  console.log("Waiting for proving result...");

  result = await vlayer.waitForProvingResult({ hash });
  console.log("Proof result:", result);
} catch (err: any) {
  console.error("❌ Error while waiting for proof:", err);
  if (err?.response) {
    try {
      const text = await err.response.text();
      console.error("❌ Raw response text:", text);
    } catch (innerErr) {
      console.error("⚠️ Could not read raw response body.");
    }
  }
  process.exit(1);
}

const [proof, owner, balance] = result;

const gas = await ethClient.estimateContractGas({
  address: verifier,
  abi: verifierSpec.abi,
  functionName: "claimWhale",
  args: [proof, owner, balance],
  account: john,
  blockTag: "pending",
});

const verificationHash = await ethClient.writeContract({
  address: verifier,
  abi: verifierSpec.abi,
  functionName: "claimWhale",
  args: [proof, owner, balance],
  account: john,
  gas,
});

const receipt = await ethClient.waitForTransactionReceipt({
  hash: verificationHash,
  confirmations,
  retryCount: 60,
  retryDelay: 1000,
});

console.log(`✅ Verification result: ${receipt.status}`);