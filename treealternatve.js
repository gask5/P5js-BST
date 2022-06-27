var bst;
var visualPointer;
var visualNewNode;
var circleNewNode;
var startT;

function setup() {
  createCanvas(1400, 900);
  bst = new BST();
  textAlign(CENTER);
  strokeWeight(2);
  background(255,0,255);
  startT = millis();

  //drawBST();
}


function draw() {
  background(153, 12, 100);
  for(d in printArray2)
    printArray2[d].drawNode();
  findNode();
  if(visualNewNode){
    if(placeHolder) placeHolder.drawNode();
    stroke(350, 88, 84);
    if((millis()-startT) < 1500 && bst.radice) visualNewNode.drawCircle();
    stroke(0,0,0);
  }
}

function findNode(){
    
    if(!visualPointer){
      printArray2 = printArray;
      placeHolder = null;
      return;
      }
    if((millis() - startT) > 500){
    startT = millis();
    visualNewNode.x = visualPointer.x;
    visualNewNode.y = visualPointer.y;
    if(visualNewNode.value > visualPointer.value){
      
      visualPointer = visualPointer.right;
    }
    else{
      visualPointer = visualPointer.left;
    }    
    }
}

function mouseDragged() {
  for(d in printArray){
    printArray[d].x+= (mouseX - pmouseX);
    printArray[d].y+= (mouseY - pmouseY);
  }
}

function addRandomValue(){
   insertAnim(Math.round(Math.random()*1000));
}

function insertAnim(valueToInsert){
  visualPointer = bst.radice;
  visualNewNode = new NodeBST(valueToInsert);
  placeHolder = new NodeBST(valueToInsert);
  placeHolder.y2 = 0;
  placeHolder.x2 = placeHolder.x = 70; 
  placeHolder.y = 50; 
  
  if(visualPointer){
    visualNewNode.y2 = visualNewNode.y = visualPointer.y;
     visualNewNode.x2 = visualNewNode.x = visualPointer.x;
  }
  else visualNewNode.y2 = visualNewNode.y = 50;
  bst.insert(valueToInsert);
}


function addValue(value){
  let valueToInsert = document.getElementById("inputValue").value;
  insertAnim(parseInt(valueToInsert));
}

function cancValue(value){
  let valueToDelete = document.getElementById("inputValue").value;
  if(valueToDelete <1000 && valueToDelete>0) bst.canc(parseInt(valueToDelete));
}
