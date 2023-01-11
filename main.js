objects = [];
status = "";
sound = "";

function preload() {
sound = loadSound("alarma.mp3");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detectando objetos";
    video.hide();
}

function modelLoaded() {
    console.log("¡Modelo cargado!")
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
image(video, 0, 0, 380, 380)
objectDetector.detect(video, gotResult);
r = random(255);
g = random(255);
b = random(255);
for(i=0; i < objects.length; i++) {
document.getElementById("status").innerHTML = "Status: Buscando al bebe facherito";

fill(r, g, b);
percent = floor(objects[i].confidence * 100);
text(objects[i].label +" "+ percent + "%", objects[i].x + 15, objects[i].y + 15);
noFill();
stroke(r, g ,b)
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    if(objects[i].label == "person") {
document.getElementById("objs").innerHTML = "Bebe detectado";
sound.stop();
    } else {
        document.getElementById("objs").innerHTML = "Bebe no detectado";
sound.play();
    }
}
    if(objects.length == 0) {
        document.getElementById("objs").innerHTML = "Bebe no detectado";
        sound.play();
        sound.rate(1);
    sound.setVolume(4);
    }
    }


