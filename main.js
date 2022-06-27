var bst;
var visualPointer;
var visualNewNode;
var circleNewNode;
var startT;
var foundNode;
var toDelete;
var toInsert;

function setup() {
  createCanvas(windowWidth, 900);
  bst = new BST();
  textAlign(CENTER);
  strokeWeight(2);
  startT = millis();
  smooth(1.0);
  foundNode = false;
  colorMode(HSB);

  //drawBST();
}


function draw() {
  background(0, 0, 10);
  for(d in printArray2)
    printArray2[d].drawLine();
  for(d in printArray2)
    printArray2[d].drawNode();
  findNode();
  if(visualNewNode){
    if(placeHolder) placeHolder.drawNode();
    stroke(350, 88, 84);
    if((millis()-startT) < 1500 && bst.radice){
      visualNewNode.drawCircle();
    } 
    stroke(0,0,0);
  }
}

function findNode(){
    if(!visualPointer){
      printArray2 = printArray;
      placeHolder = null;
      if(toDelete) 
      {
        if((millis()-startT) > 1500){
        bst.canc(toDelete);
        toDelete = null;
        }
      }
      return;
    }
    if((millis() - startT) > 500){
    startT = millis();
    visualNewNode.x = visualPointer.x;
    visualNewNode.y = visualPointer.y;
    if(visualNewNode.value > visualPointer.value){
      visualPointer = visualPointer.right;
    }
    else if(visualNewNode.value < visualPointer.value){
      visualPointer = visualPointer.left;
    } 
    else{
      visualPointer = null;
    }       
    }
}

function mouseDragged() {
  if(!placeHolder)
  for(d in printArray){
    printArray[d].x+= (mouseX - pmouseX);
    printArray[d].y+= (mouseY - pmouseY);
  }
}

function addRandomValue(){
   insertAnim(Math.round(Math.random()*1000));
}

function insertAnim(valueToInsert){
  enablePlaceHolder(valueToInsert);
  bst.insert(valueToInsert);
}

function cancAnim(valueToDelete){
  enablePlaceHolder(valueToDelete);
    toDelete = valueToDelete;
}

function enablePlaceHolder(value){
  visualPointer = bst.radice;
  visualNewNode = new NodeBST(value);
  placeHolder = new NodeBST(value);
  placeHolder.y2 = 0;
  placeHolder.x2 = placeHolder.x = windowWidth/2; 
  placeHolder.y = 50; 
  
  if(visualPointer){
    visualNewNode.y2 = visualNewNode.y = visualPointer.y;
     visualNewNode.x2 = visualNewNode.x = visualPointer.x;
  }
  else visualNewNode.y2 = visualNewNode.y = 50;
}


function addValue(value){
  let valueToInsert = document.getElementById("inputValue").value;
  if(valueToInsert <1000 && valueToInsert>0) insertAnim(parseInt(valueToInsert));
}

function cancValue(value){
  let valueToDelete = document.getElementById("inputValue").value;
  if(valueToDelete <1000 && valueToDelete>0) cancAnim(parseInt(valueToDelete));
}
