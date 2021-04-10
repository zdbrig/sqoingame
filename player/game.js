const Web3 = require("web3");
const ETHTX = require("ethereumjs-tx");

const SqoinToken = require("../build/contracts/SqoinToken.json");
const Game = require("../build/contracts/Game.json");

var provider = "";

/*  init web3 connection */


let web3 = new Web3(provider);

/* player account */
let account = "";
let privateKey = "";
/* ---- */




makeMove = (onerror, game ,  number , gameAddress) => {
    web3.eth.getTransactionCount(account, (err, nonce) => {
        if (err) {
            console.log("problem getting nonce" + err);
            onerror();
            return;
        }
        let method = game.methods.updateNumber(number);

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

            console.log("move done !");
        });
    });
}


let values = require("./moves");


let play = x => values[x];


let gameList =  [ "0xbf532B8b83E6A8480f667b0F42Dc57057ced1518" ];


setInterval(() => {
    gameList.forEach(gameAddress => {
    let game = new web3.eth.Contract(Game.abi, gameAddress);
    game.methods.turn().call().then(
        address => {
            console.log("current turn address = " + address);
            if (address === account) {
                game.methods.currentNumber().call().then(
                    number => {
                        if (number ) {
                            let response = play(number);
                            console.log(number + " " + response);
                            makeMove( () => {} , game ,  response , gameAddress);
                        }
                        
                    }
                )
            }
        }
    )
    
    });
}, 10000);