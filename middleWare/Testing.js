'use strict';

class test {
    testwangwang(wang, hou) {
        console.log('this is : wang ' + wang + ' this is : hou ' + hou);
    };
    testfeifeifei(fei) {
        console.log('this is fei : ' + fei);
    };
}
class jim extends test{
    testwangwang(hou) {
        console.log('this is houqwe : ' + hou); 
    };
    testfeifeifei(fei) {
        console.log('this is feidd : ' + fei);
    };
}
function jim11() {
    let p1 = new test();
    let ji1 = new jim();
    p1.testfeifeifei('asd');
    p1.testwangwang('asd','ds');
    ji1.testfeifeifei('6666');
    ji1.testwangwang('zxc');
};
function testfun() {
    this.username = 'jim';
    console.log(this);
};

