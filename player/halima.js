/* Halima Bergaoui 5 coins */


let test = (number) => {
    if (getRaws()==1) return 0
    var it=1;
    if(testXor(number)==0 ){
    if(number%10>1) return number-1
    if(number%100>10) return number-1
    if(number%1000>10) return number-1
    if(number%10000>1000) return number-1
    if(number%100000>10000) return number-1
}
    let tst=-1;
    n=0

    for(it=1; it<10;it++){
       n=anyMove(number,it);
       x=Math.floor(n%10)
       if(tst=testXor(n)==0 && it<=number%10) return n
       n=anyMove(number,it*10);
       if(tst=testXor(n)==0 && it<=((Math.floor(number/10))%10)) return n
       n=anyMove(number,it*100);
       if(tst=testXor(n)==0 && it<=((Math.floor(number/100))%10)) return n
       n=anyMove(number,it*1000);
       if(tst=testXor(n)==0 && it<=((Math.floor(number/1000))%10)) return n
       n=anyMove(number,it*10000);
       if(tst=testXor(n)==0 && it<=((Math.floor(number/10000))%10)) return n
   }

   return n;

}
function anyMove(number,it){
   let n=number
       return n-it
    
}
function getRaws(n){
    raws=0
    x=n
    for(var i=0;i<5;i++){
        xn=x%10
        if(xn!=0) raws=raws+1;
        x=Math.floor(x/10)
    }
    return raws
}
function testXor(n){
    xor=n%10;
    x=n/10
    for(var i=1;i<5;i++){
        xn=x%10
        xor=xor^xn
        x=Math.floor(x/10)
    }
    return xor
}
module.exports =test;
