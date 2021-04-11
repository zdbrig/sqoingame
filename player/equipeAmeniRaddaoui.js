//this work is done by ameniR , fedia , jawaher , amal chaabi , amal fathallah 
//we won 50 sqn


function checkXOR(a) {
    let somme;
    for (i = 0; i < a.length; i++) {
        somme = Number(a[i]) ^ somme;
    }
    return somme;
}




function check(x) {
  
    let x1 = x;
    let res = 5;
    let bestSol = 0;
    for (let i = 0; i < x.length; i++) {
        if (res != 0) {
            let z = "1";
            for (let y = 0; y < i; y++) {
                z = z + "0";
            }
            var a = Math.floor(Number(x1) / Number(z)) % 10;
            console.log("a : " + a)

            for (a; a > 0; a--) {
                if (res != 0 || a > 0) {
                    let s = a * Number(z);
                    console.log("new a " + a);
                    x1 = x - s;
                    console.log("x1 :" + x1);
                    res = checkXOR(x1.toString());
                    console.log("res : " + res);
                    if (res == 0) {
                        bestSol = x1;
                        console.log("********this is best sol:" + bestSol)
                        return bestSol;
                    }
                }
            }
        }
    }
    if (bestSol != 0) {
        console.log("********this is best sol:" + bestSol)
        return bestSol;
    }
    else {
        console.log("there isn't best solution")
        return 0;
    }
}

module.exports =check;
