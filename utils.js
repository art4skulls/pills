

function reseed(seed) {
    randomSeed(seed);
    noiseSeed(seed);
}


let pa;
let __canvas;
let __appName;

function angleOfLine(start,end) {
    return atan2(end.y - start.y, end.x - start.x);
}

function brightnessAdj(c,v) {
    return color(
        red(c)*v,
        green(c)*v,
        blue(c)*v
    );
}

function setCanvas(canv) {
    _canvas=canv;
}

function setAppName(a) {
    __appName=a;
}


function keyTyped() {
    if (key === 's') {
        saveCanvas( __appName, 'png');
    }
}

function setPixel(x,y,col,p) {
    let d = pixelDensity();
    for (let i = 0; i < d; i++) {
        for (let j = 0; j < d; j++) {
            index = 4 * ((y * d + j) * width * d + (x * d + i));
            p[index] = red(col);
            p[index+1] = green(col);
            p[index+2] = blue(col);
            p[index+3] = alpha(col);
        }
    }
}

function getPixel(x,y,p) {
    let d = pixelDensity();
    index = 4 * ((y * d ) * width * d + (x * d ));
    return color( p[index] ,p[index+1] , p[index+2],  p[index+3]);
}

function colorClone(c,cf,af) {
    if (cf==null) {
        return color(red(c),green(c),blue(c),c._getAlpha());
    }
    else {
        let r =      red(c);
        let g =      green(c);
        let b =      blue(c);
        let a =      alpha(c);
        if (af==null) {af=1;}
        let t= color(r*cf,g*cf,b*cf,a*af);
        return t;
    }

}

function drawAxes() {
    push();
    stroke(0);
    strokeWeight(1);
    line (-width,0,width,0);
    line (0,-height,0,height);
    pop();

}

function getTopLeftStart(pixArray,w,h) {
    var x, y;
    let d=pixelDensity();
    A: for (var row = 0; row <h; row++) {
        for (var col = 0; col < w; col++) {
            const i =  (4*row*w) +  (4 * d*col) ;
            if (pixArray[i]>0 ||pixArray[i+1]>0 || pixArray[i+2]>0 ||pixArray[i+3]>0) {
                console.log("Found at "+row+","+col);
                x = col;
                y = row;
                break A;
            }
        }
    }
    return point(x,y);
}

function rgb(r,g,b) {
    return color(r,g,b);
}

function rarray(a) {
    return a[floor(random(0, a.length))];
}

function hex2rgba(arr) {
    let rgb=[];
    for (var a in arr) {
        rgb.push(hexToRgb(arr[a]));
    }
    return rgb;
}

function hexToRgb(hex) {
    hex = hex.replace('#', '').toUpperCase();
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return color(r, g, b);
}

function samecolor(a,b){
    return a && b && red(a)==red(b) && green(a)==green(b) && blue(a)==blue(b);
}