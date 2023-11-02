let predictions = [];
let currentEmotion = 'happy';
let isTraining = true;
// Create a new handpose method
let handpose;
function setup() {
    createCanvas(500, 500);
    background(100);
    capture = createCapture(VIDEO);
    capture.size(500, 500);
    capture.hide();
    handpose = ml5.handpose(document.querySelector('video'));
    // Listen to new 'face' events
    handpose.on('hand', results => {
        predictions = results;
        if (!predictions[0]) {
            return;
        } else if (predictions[0].handInViewConfidence > 0.95) {
            for (let node of predictions[0].landmarks) {
                let x = node[0] - 70;
                let y = node[1];
                line(x, y, 0,0);
                line(x,y,capture.width,0);
                line(x,y,0,capture.height);
                line(x,y,capture.width, capture.height);
            }
            //circle(predictions[0].annotations.palmBase[0],predictions[0].annotations.palmBase[1],10)
        }
    });

}

function draw() {
    translate(capture.width, 0);
    scale(-1, 1)
    image(capture, 0, 0, capture.width, capture.height);
}

// When the model is loaded
function modelLoaded() {
    console.log('Model Loaded!');
}