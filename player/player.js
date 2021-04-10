const Web3 = require("web3");
const ETHTX = require("ethereumjs-tx");

const SqoinToken = require("../build/contracts/SqoinToken.json");
const Game = require("../build/contracts/Game.json");

var provider = "";

/*  init web3 connection */


let web3 = new Web3(provider);
let sqoinAddress = "";

/* player account */
let account = "";
let privateKey = "";
/* ---- */

let sqoinToken = new web3.eth.Contract(SqoinToken.abi, sqoinAddress);


createNewChallenge = (onerror, play) => {
    web3.eth.getTransactionCount(account, (err, nonce) => {
        if (err) {
            console.log("problem getting nonce" + err);
            onerror();
            return;
        }
        let method = sqoinToken.methods.createChallenge();

        let tx = new ETHTX.Transaction({
            nonce: nonce,
            gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
            gasLimit: 12000000,
            value: 0,
            to: sqoinAddress,
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


createNewChallenge(
    () => { console.log("unable to create Challenge") },
    (txhash, nonce) => {
        sqoinToken.methods.myGame(account).call().then(
            address => {
                console.log("new game created with address " + address);
            }
        );
        console.log("challenge created ! " + txhash)

    }
) 
/*
sqoinToken.methods.myGame(account).call().then(
            address => {
                console.log("new game created with address " + address);
            }
        );*/