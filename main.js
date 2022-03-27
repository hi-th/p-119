array_1 = ['pen','paper','book','bottle'];
random_no = Math.floor((Math.random()*array_1.length)+1);
element_of_array = array_1[random_no];

timer_counter = 0;
timer_check = "";
draw_sketch = "";
answer_holder = "";
score = 0;

function draw() {
    check_sketch();
    if(draw_sketch == sketch) {
        answer_holder = set;
        score = score + 1;
        document.getElementById("score").innerHTML = "Score:" + score;
        strokeWeight(17);
        stroke(0);
        if(mouseIsPressed) {
            line(pmouseX,pmouseY,mouseX,mouseY);
        }
    }
}

function check_sketch() {
    timer_counter = timer_counter + 1;
    document.getElementById("timer").innerHTML = "Timer:" + timer_counter;
    console.log(timer_counter);
    if (timer_counter > 400) {
        timer_counter = 0;
        timer_check = "completed";
    }
    if (timer_check = "completed") {
        timer_check = "";
        answer_holder = ""
        updateCanvas();
    }
}

function updateCanvas() {
    background("#ffffff");
    random_number = Math.floor((Math.random() * quick_draw_data_set.length) + 1);
    sketch = quick_draw_data_set[random_number]; 
    document.getElementById('sketch_name').innerHTML = 'Sketch To be Drawn: ' + sketch;
}

function setup() {
    canvas = createCanvas(280 , 280);
    canvas.center();
    background("#ffffff");
    canvas.mouseReleased(classifyCanvas);
}

function preload() {
    classifier = ml5.imageClassifier();
}

function classifyCanvas() {
    classifier.classify(canvas,gotResult);
}

function gotResult(error,results) {
    if(error) {
        console.error(error);
    } else{
        console.log(results);
        drawn_sketch = results[0].label;
        document.getElementById("label").innerHTML = drawn_sketch
        document.getElementById("confidence").innerHTML = "confidence:"+Math.round(results[0].confidence*100)+"%";
    }
}