import Onboard, { modules } from "bnc-onboard";
import Web3 from "web3";

import "./styles.css";

const BLOCKNATIVE_KEY = "c5bbc396-355d-4b81-883f-b284ba15faed";
const NETWORK_ID = 3;
const FORTMATIC_KEY = "pk_test_886ADCAB855632AA";
const PORTIS_KEY = "d7d72646-709a-45ab-aa43-8de5307ae0df";
const INFURA_KEY = "d5e29c9b9a9d4116a7348113f57770a8";
const SQUARELINK_KEY = "87288b677f8cfb09a986";

let web3;

// initialize onboard library with subscriptions
const onboard = initializeOnboard({
  address: address => {
    const span = document.getElementById("address");
    span.innerHTML = address != null ? address : "";
  },
  network: network => {
    const span = document.getElementById("network");
    span.innerHTML = network != null ? network : "";
  },
  balance: balance => {
    const span = document.getElementById("balance");
    span.innerHTML = balance != null ? balance : "";
  },
  wallet: wallet => {
    if (wallet.provider) {
      web3 = new Web3(wallet.provider);
      console.log(`connected to ${wallet.name}`);
    }
  }
});

const walletCheckButton = document.getElementById("walletCheck");
walletCheckButton.onclick = onboard.walletCheck;

const walletSelectButton = document.getElementById("walletSelect");
walletSelectButton.onclick = async () => {
  const walletSelected = await onboard.walletSelect();
  if (walletSelected) {
    walletCheckButton.disabled = false;
  }
};

function initializeOnboard(subscriptions) {
  const wallets = [
    { walletName: "coinbase", preferred: true },
    { walletName: "trust", preferred: true },
    { walletName: "metamask", preferred: true },
    { walletName: "dapper", preferred: true },
    {
      walletName: "fortmatic",
      apiKey: FORTMATIC_KEY,
      preferred: true
    },
    {
      walletName: "portis",
      apiKey: PORTIS_KEY,
      preferred: true
    },
    {
      walletName: "squarelink",
      apiKey: SQUARELINK_KEY
    },
    { walletName: "authereum" },
    {
      walletName: "walletConnect",
      infuraKey: INFURA_KEY
    }
  ];

  const walletChecks = [
    { checkName: "connect" },
    { checkName: "network" },
    { checkName: "balance", minimumBalance: "10000" }
  ];

  return Onboard({
    dappId: BLOCKNATIVE_KEY,
    networkId: NETWORK_ID,
    subscriptions,
    walletSelect: {
      heading: "Select a Wallet",
      description: "Please select a wallet to connect to this dapp:",
      wallets
    },
    walletCheck: walletChecks,
    darkMode: true
  });
}
