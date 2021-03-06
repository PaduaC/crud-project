const fs = require("fs");
const HDWalletProvider = require("truffle-hdwallet-provider");
const secrets = JSON.parse(
  fs.readFileSync("./.secrets-example").toString().trim()
);

module.exports = {
  networks: {
    ropsten: {
      provider: () =>
        new HDWalletProvider(
          // seed phrase
          secrets.seed,
          `https://ropsten.infura.io/v3/${secrets.projectId}`
        ),
      network_id: 3,
    },
  },
};
