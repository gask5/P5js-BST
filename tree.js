var targetNode;
var depthArray = [];
var printArray = [];
var printArray2= [];
var newNode;

class BST{    
      constructor(){ this.radice = null;}

      insert(value){
            newNode = new NodeBST(value);
            if(this._search(this.radice,value)) return null;
            var ptr = this.radice;
            var padre = ptr;

            if(this.radice == null ){
                  newNode.setOrder(1);
                  newNode.setDepth(0);
                  this.radice = newNode;
                  this.radice.setX(windowWidth/2);
                  this.radice.setY(250);
                  this.fixMethod();
                  return this.radice;
            }
            while(ptr != null){
                  newNode.x = ptr.x;
                  newNode.y = ptr.y;
                  if(ptr.getValue()==value) return;
                  padre = ptr;
                  if(value>= ptr.getValue()) {
                        ptr = ptr.getRight();
                  }
                  else ptr = ptr.getLeft();            
            }
            newNode.setParent(padre);
            if(value>=padre.getValue()){
                  newNode.setX(newNode.getParent().getX()+newNode.size/2);
                  padre.setRight(newNode);
            }
            else{
                  newNode.setX(newNode.getParent().getX()-newNode.size/2);
                  padre.setLeft(newNode);
            }
            
            
            newNode.setDepth(newNode.getParent().getDepth()+1);
            newNode.setY(newNode.getDepth()*newNode.size+50);
            
           
            this.fixMethod();
            return newNode;
      }
      
      getRadice(){
        return this.radice;
      }
      

      _search(node,key){
            if(!node) return null;
            if(node.getValue()==key){
                  console.log("Found node");
                  targetNode = node;
                  return true;
            } 

            if(key > node.getValue()) this._search(node.getRight(),key);
            else  this._search(node.getLeft(),key);
      }

      succ(node){
            if(node.getRight()) return this.minimo(node.getRight());
            
            let p = node.getParent() ;
            while(p && node.getValue() > p.getValue()){
                p = p.getParent();
            }

            return p;
        }

      minimo(node){
            if(node.getLeft()) return this.minimo(node.getLeft());
            return node;
      }
      
      massimo(node){
            if(node.getRight()) return this.massimo(node.getRight());
            return node;
      }

      canc(key){
            this._search(this.radice,key);
            var tmp = targetNode;
            if(tmp) this._canc(tmp,key);
            targetNode=null;
            this.fixMethod();
            return this;
      }
      
      fixMethod(){
            printArray2=printArray;
            printArray=[];
            this.fixTree();
            this.preOrder();
            this.fixTree();
      }

      _canc(node, key){
            if(node.getLeft()&&node.getRight()){
                let successore = this.succ(node);
                node.setValue( successore.getValue() );
                this._canc( successore, successore.getValue() );
            }

            else{
                
                let child = node.getRight();
                if(!child) child = node.getLeft();

                let padre = node.getParent();

                if(child){
                  child.setParent(padre);
                  child.setDepth(child.depth-1);
                }

                if(!padre) {
                    this.radice = child;
                    this.fixMethod();
                    return;
                }

               

                if(node.getValue() >= padre.getValue()){
                  padre.setRight(child);
                } 
                else {
                  padre.setLeft(child);
                }


                
               this.fixMethod();
               return;
                
            }
        }
      // print() {    text(printArray[d].getValue(),(1400-(Math.pow(2,printArray[d].getDepth()))*60)/2+printArray[d].getOrder()*60 ,100+printArray[d].getDepth()*100);  
      //       print(this.radice);
      // }
      
      preOrder(node = this.radice){
            if(node==null) return;
            //console.log(node.getValue()+ " ");
            printArray.push(node);
            //node.drawNode();
            //text(node.getValue(),node.getX()-5,node.getY());
            //if(node.getParent()) line(node.getX(),node.getY(),node.getParent().getX(),node.getParent().getY());
            this.preOrder(node.getLeft()); 
            this.preOrder(node.getRight());   
      }
      
    fix(node){
        let parent = node.getParent();
        if(parent == null) return;
        let min = node.minimo(node);
        //console.log(document.getElementById(tmp.getValue()).style.marginLeft);
  
       
        if (min.x - node.size/1.5 < parent.x && node.x >= parent.x){
              this.fixSons(node,node.size/1.5);
        }
  
        let max = node.massimo(node);
  
         
        //console.log(max.getValue() + " " + parent.getValue())
  
        if (max.x + node.size/1.5 > parent.x && node.x <= parent.x){
              this.fixSons(node,-node.size/1.5);
        }
      }

      //connect(document.getElementById(node.getValue()),document.getElementById(node.getParent().getValue()), "#000" , 1);

    fixSons(n , delta){
          if (n==null) return;

          
          this.fixSons(n.left, delta);
          this.fixSons(n.right, delta);
          
          n.setX(n.getX()+delta);
          n.depth=n.parent.depth+1;
          n.setY(n.parent.y+n.size);
    }
    
    fixSonsY(n , delta){
          if (n==null) return;
          this.fixSons(n.left, delta);
          this.fixSons(n.right, delta);
          n.depth-=1;
          n.setY(n.depth*15+50);
    }

    fixTree(node = this.radice){
          if(node==null) return;
          this.fixTree(node.getRight());
          this.fixTree(node.getLeft()); 
          this.fix(node);
          
    }


      
        
};

function drawBST(){
  for( d in printArray){
    ellipse((1400-(Math.pow(2,printArray[d].getDepth()))*60)/2+printArray[d].getOrder()*60 ,100+printArray[d].getDepth()*100,50,50);
    text(printArray[d].getValue(),(1400-(Math.pow(2,printArray[d].getDepth()))*60)/2+printArray[d].getOrder()*60 ,100+printArray[d].getDepth()*100);  
    if(printArray[d].getParent()) line((1400-(Math.pow(2,printArray[d].getDepth()))*60)/2+printArray[d].getOrder()*60,100+printArray[d].getDepth()*100,(1400-(Math.pow(2,printArray[d].getParent().getDepth()))*60)/2+printArray[d].getParent().getOrder()*60,100+printArray[d].getParent().getDepth()*100);
}
}
