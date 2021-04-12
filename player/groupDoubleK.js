//coin :5sqn
// this job done  By khouloud,Karima,Emna,Dhouha,Walid and Oussema Barka .
var curNumber = "123";
let A = [];
for (var i = 0; i < curNumber.length; i++) {
  A.push(curNumber[i]);
}



function traitemt(A) {
  let res = 0;
  let val = 0;
  let B = [];
  let D = [];
  let C = [];

  for (var i = 0; i < A.length; i++) {

    if (i > 0) {
      C = A.slice(0, i);
    }
     B = A.slice(i, i + 1);
    if (i < A.length) {
      D = A.slice(i + 1, A.length);
    }

    for (var j = 0; j < B; j++) {
      {
         val = [];
        val.push(j);
        let x = C.concat(val);
        x = x.concat(D);
           res = 0;
        for (let k = 0; k <= x.length; k++) {
          res ^= x[k];
        }
        if (res == 0) {
          return;
        }
      }
    }
  }
}

traitemt(A);
