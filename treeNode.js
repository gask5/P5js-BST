class NodeBST {
    
      constructor(_value) {
        this.value=_value;
        this.parent = this.right = this.left = null;
        this.x = this.x2 = windowWidth/2;
        this.y = this.y2 = 50;
        this.depth = 0;
        this.order = 0 ;
        this.fixed = false;
        this.size=30;
      }
      
      getDepth(){
        return this.depth;
      }

      getColor(){
        return this.color;
      }
      
      getOrder(){
        return this.order;
      }
      
      getSize(){
      return this.size;
      }

      setDepth(value){
        this.depth = value;
      }
      
      setOrder(_value){
        this.order =_value;
      }
      
      getValue() {
        if (this.value==null) { return 0} ;
        return this.value;
      }
      getParent() {
        return this.parent;
      }
      getRight() {
        return this.right;
      }
      getLeft() {
        return this.left;
      }
    
      minimo(n) {
        if (n.getLeft()==null) return n;
        else return this.minimo(n.getLeft());
      }
    
      massimo(n) {
        if (n.getRight()==null) return n;
        else return this.massimo(n.getRight());
      }
    
      getX() {
        return this.x;
      }
      getY() {
        return this.y;
      }
    
      setValue(_value) {
        this.value = _value;
      }
      setParent(_parent) {
        this.parent = _parent;
      }
      setRight(_right) {
        this.right = _right;
      }
      setLeft(_left) {
        this.left = _left;
      }        
      setX(_x) {
        this.x = _x;
      }
      setY(_y) {
        this.y = _y;

      }

      drawLine(){
        if(this.parent && this.fixed == true ){
          strokeWeight(2);
          stroke(this.value%360,45,100);
          line(this.x2,this.y2,this.parent.x2,this.parent.y2);
        }
      }
      
      drawNode(){
          if(Math.abs(this.x - this.x2) > 0.01){
            this.x2 += (this.x - this.x2) *0.1;
          } 
          if(Math.abs(this.y - this.y2) > 0.01){
            this.y2 += (this.y - this.y2) *0.1;
          } 
          fill(this.value%360,15,50);
          strokeWeight(2);
          stroke(this.value%360,45,100);
          ellipse(this.x2,this.y2,this.size,this.size);
          strokeWeight(0);
          fill(255,0,255);
          text(this.value,this.x2,this.y2+4);
          if(Math.abs(this.x - this.x2) < 2 && Math.abs(this.y - this.y2) < 2) this.fixed=true;
      }
      
      drawCircle(){
          if(Math.abs(this.x - this.x2) > 0.01){
            this.x2 += (this.x - this.x2) *0.1;
          } 
          if(Math.abs(this.y - this.y2) > 0.01){
            this.y2 += (this.y - this.y2) *0.1;
          } 
          colorMode(HSB);
          fill(255,255,255,0);
          strokeWeight(2);
          ellipse(this.x2,this.y2,this.size,this.size);
          if(Math.abs(this.x - this.x2) < 2 && Math.abs(this.y - this.y2) < 2) this.fixed=true;
      }
}
