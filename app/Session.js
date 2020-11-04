import * as THREE from "./three.module.js"
import { Shape } from "./Shape.js"
import { Cube } from "./Cube.js"
import { Sphere } from "./Sphere.js"
import { scene } from "./main.js"

class Session {
  constructor(origin){
    // [ 0, 0, 0 ]
    this.origin = origin
    this.currentShapeId = null
    this.shapes = {}
  }

  newCube(){
    // let geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
    let shape = new Cube(0.1,0.1,0.1)
    this.shapes[shape.id] = shape
    // this.shapes[shape.id].mesh.position.set(randomSign() * Math.random()*3, randomSign() * Math.random()*6, randomSign() * Math.random()*3)

    this.currentShapeId = shape.id
    scene.add(this.shapes[shape.id].mesh)
  }

  newSphere(){
    let shape = new Sphere(0.1)
    this.shapes[shape.id] = shape
    this.currentShapeId = shape.id

    scene.add(this.shapes[shape.id].mesh)
  }

  copyCurrentShape(){
    let duplicate = this.shapes[this.currentShapeId].duplicate()
    this.shapes[duplicate.id] = duplicate
    scene.add(this.shapes[duplicate.id].mesh)
    this.currentShapeId = duplicate.id
  }


  getOrigin(){
    let origin
    origin = document.getElementById("origin").value

    if(origin.length == 0){
      origin = [0,0,0]
    } else {
      console.log( 'originvak', origin )
      origin = origin.split(",").map(pos => parseFloat(pos))
    }
    return origin
  }

  printShapes(){
    let shapeIds = Object.keys(this.shapes)
    let outputStr = "var group = new THREE.Group()\n\n"
    let shapeId
    for(var i=0; i<shapeIds.length; i++){
      shapeId = shapeIds[i]
      // console.log( 'geo', this.shapes[shapeId].mesh.geometry )
      outputStr += this.shapes[shapeId].print()
    }

    outputStr += "scene.add(group)\n"

    return outputStr
  }

  printCharacters(){
    let shapeIds = Object.keys(this.shapes)
    let outputStr = ""
    let shapeId

    let origin = this.getOrigin()
    for(var i=0; i<shapeIds.length; i++){
      shapeId = shapeIds[i]
      // console.log( 'geo', this.shapes[shapeId].mesh.geometry )
      outputStr += this.shapes[shapeId].printCharacter(origin)
    }

    return outputStr
  }

  /////// UI
  drawShapesList() {
    let str = ""
    let shapeIds = Object.keys(this.shapes)
    let shapeId

    let selected, selectedShape
    for(var i=0; i<shapeIds.length; i++){
      shapeId = shapeIds[i]

      if(shapeId == this.currentShapeId){
        selected = "*"
        selectedShape = this.shapes[shapeId]
      } else {
        selected = ""
      }

      str += "<h2 style='color: " + this.shapes[shapeId].color + ";'>" + selected + this.shapes[shapeId].name + "</h2>"
    }

    if(selectedShape){
      str += "<h2 style='font-size: 10px;'>" + selectedShape.mesh.position.x.toFixed(8) + "," + selectedShape.mesh.position.y.toFixed(8) + "," + selectedShape.mesh.position.z.toFixed(8) + "</h2>"
    }

    // console.log( 'shape list', str )
    document.getElementById("shape-list").innerHTML = str
  }

  drawColorPick(){
    // just fill it in
    if(!document.getElementById("color").value && this.shapes[this.currentShapeId]){
      document.getElementById("color").value = this.shapes[this.currentShapeId].color
    }
  }

  handleKey(shape, key, shift, fine=false, reset=false){
    // main mode keys
    if(key == 'z'){
      this.newCube()
    } else if(key == 'x'){
      this.newSphere()
    }

    let moveAmount, amount
    if(fine){
      moveAmount = 0.001
      amount = 0.01
    } else {
      moveAmount = 0.01
      amount = 0.1
    }

    if(reset){
      // for now, forget it
      // amount = 0
      return this.resetKey(key)
    }

    if(key == "ArrowLeft" || key == "ArrowUp" || key == "ArrowRight" || key == "ArrowDown"){
      shape.move(key, moveAmount, shift)
    }

    // rotate
    if(key == "q"){
      shape.rotateX(amount)
    } else if(key == "a"){
      shape.rotateX(-amount)
    } else if(key == "w"){
      shape.rotateY(amount)
    } else if(key == "s"){
      shape.rotateY(-amount)
    } else if(key == "e"){
      shape.rotateZ(amount)
    } else if(key == "d"){
      shape.rotateZ(-amount)
    }

    // scale
    if(key == "r"){
      shape.scaleX(amount)
    } else if(key == "f"){
      shape.scaleX(-amount)
    } else if(key == "t"){
      shape.scaleY(amount)
    } else if(key == "g"){
      shape.scaleY(-amount)
    } else if(key == "y"){
      shape.scaleZ(amount)
    } else if(key == "h"){
      shape.scaleZ(-amount)
    }

    // utilty functions
    if(key == "p"){
      // console.log( shapes[this.currentShapeId].print() )
      console.log( 'output ', this.printShapes() )
      document.getElementById("output").value = this.printShapes()
    } else if(key == "o"){
      console.log( 'output ', this.printCharacters() )
      document.getElementById("output").value = this.printCharacters()
    } else if(key == "u"){
      this.copyCurrentShape()
    }

    if(event.key == "Delete"){
      this.shapes[shape.id].remove(scene)
      delete this.shapes[this.currentShapeId]
    }

    if(event.key == "["){
      console.log( 'brack left', this.shapes )
      let keys = Object.keys(this.shapes)
      let currentKeyIndex = keys.indexOf( this.currentShapeId )
      this.currentShapeId = keys[ currentKeyIndex - 1 ]

      if(!this.currentShapeId){
        // go to right side
        this.currentShapeId = keys[keys.length - 1]
      } 

    } else if(event.key == "]"){
      console.log( 'brack rioght', this.shapes )
      
      let keys = Object.keys(this.shapes)
      let currentKeyIndex = keys.indexOf( this.currentShapeId )
      this.currentShapeId = keys[ currentKeyIndex + 1 ]

      if(!this.currentShapeId){
        // go to right side
        this.currentShapeId = keys[0]
      }
    }
  }

  resetKey(key){
    
  }

}

export { Session }