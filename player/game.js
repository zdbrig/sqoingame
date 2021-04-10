const Web3 = require("web3");
const ETHTX = require("ethereumjs-tx");

const SqoinToken = require("../build/contracts/SqoinToken.json");
const Game = require("../build/contracts/Game.json");

var provider = "your infura link";

/*  init web3 connection */


let web3 = new Web3(provider);

/* player account */
let account = "yout account";
let privateKey = "your private key";
/* ---- */


let gameAddress = "0xa150298B22D402B344742cd9df0E0CeB84fe6cC8";
let game = new web3.eth.Contract(Game.abi, gameAddress);

game.methods.currentNumber().call().then(
    number => console.log(number)
)

makeMove = (onerror, play) => {
    web3.eth.getTransactionCount(account, (err, nonce) => {
        if (err) {
            console.log("problem getting nonce" + err);
            onerror();
            return;
        }
        let method = game.methods.updateNumber(5030);

        let tx = new ETHTX.Transaction({
            nonce: nonce,
            gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
            gasLimit: 12000000,
            value: 0,
            to: gameAddress,
            data: method.encodeABI()
        }, { chain: "kovan" });

        tx.sign(Buffer.from(privateKey, "hex"));

        let raw = '0x' + tx.serialize().toString("hex");

        web3.eth.sendSignedTransaction(raw, (err, hash) => {
            if (err) {
                console.log("error while creating challenge" + err);
                onerror();
                return;
            }

            play(hash, nonce + 1);
        });
    });
}

makeMove(
    err => console.log(err),
    (hash, nonce) => { console.log("great , move done, let's see what Bacem will do right now !") }
)