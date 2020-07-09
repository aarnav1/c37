var painting= [];
var currentPath = [];
var database;
var form, milk;
var button;

function setup() {
  var canvas = createCanvas(900,500);
 
  database=firebase.database();
  var databaseRef=database.ref("cursor/currentPath");
  databaseRef.on("value",startPath,endPath);

  canvas.mousePressed(startPath);
  canvas.mouseReleased(endPath);

  button = createButton('Clear');
  button.position(450, 800);
}

function startPath(){
   currentPath = [];
   painting.push(currentPath);
}

function endPath(){

}

function draw() {
  background("white");
  if(mouseIsPressed){
    var point = {
      x : mouseX,
      y : mouseY
    }

    
    
    currentPath.push(point);

  } 

  button.mousePressed(function(){
    var drawingRef = database.ref('savedDrawing');
    var data = {
      savedDrawing :painting
    }
    drawingRef.push(data);

  });

  noFill("black");
  stroke("black"); 
  strokeWeight(10);

  for(var i = 0; i< painting.length; i++){
    var path = painting[i];
    beginShape();
    for(var p = 0; p< path.length; p++){
        vertex(path[p].x, path[p].y);
    }
    endShape();
  }

}