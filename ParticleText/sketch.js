var font;
var particles = [];
var myText;
var tText1 = 'napis';
var tText2 = 'innynapis';
var tSize = 120;
var tWidth1;
var tWidth2;
var isSwitch = true;
var factor = 0.5;

function preload() {
    font = loadFont('AdobeClean-Bold.otf');
}

function setup() {
    textSize(tSize);
    tWidth1 = textWidth(tText1);
    tWidth2 = textWidth(tText2);
    
    createCanvas(
        window.innerWidth, 
        window.innerHeight, 
        WEBGL
    );
    
    myText = new Text(factor);
    myText.createText(tText1, tSize, tWidth1);
}

function draw() {
    
    background(0);
    pointerBlock();
    
    myText.light();
    myText.go()
}

function mouseClicked() {
    if(isSwitch) {
        myText.createText(tText2, tSize, tWidth2);
        isSwitch = false;
    }
    else {
        myText.createText(tText1, tSize, tWidth1);
        isSwitch = true;
    }
}

function pointerBlock() {
    push();
    var v = createVector(mouseX, mouseY, 0);
    translate(v.x - width*0.5, v.y-height*0.5, v.z);
    var a = atan2(mouseX-width*0.5, mouseY-height*0.5);
    rotateY(a);
    rotateX(a);
    rotateZ(a);
    box(20,20,20);
    pop();
}

