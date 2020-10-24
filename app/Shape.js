import * as THREE from "./three.module.js"
import { Util } from './Util.js'

class Shape {
  constructor(geo){
    this.id = Math.random().toString(36).slice(2)
    this.color = new Util().rgbToHex(Math.floor( Math.random() * 255 ), Math.floor( Math.random() * 255 ), Math.floor( Math.random() * 255 ))
    this.mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial( { needsUpdate: true, color: this.color, transparent: true }))

    if(!this.name){
      this.name = "Shape " + this.id
    }
  }

  setColor(hex){
    this.color = hex
    console.log( 'color is ', hex )
    this.mesh.material.color.set(this.color)
  }

  move(keyName, shift=false){

    if(keyName == 'ArrowLeft'){
      this.mesh.position.set( this.mesh.position.x + 0.01, this.mesh.position.y, this.mesh.position.z )
    } else if(keyName == 'ArrowRight'){
      this.mesh.position.set( this.mesh.position.x - 0.01, this.mesh.position.y, this.mesh.position.z )

    } else if(keyName == 'ArrowUp'){
      if(shift){
        this.mesh.position.set( this.mesh.position.x, this.mesh.position.y + 0.01, this.mesh.position.z )  
      } else {
        this.mesh.position.set( this.mesh.position.x, this.mesh.position.y, this.mesh.position.z + 0.01 )
      }

    } else if(keyName == 'ArrowDown'){
      if(shift){
        this.mesh.position.set( this.mesh.position.x, this.mesh.position.y - 0.01, this.mesh.position.z )  
      } else {
        this.mesh.position.set( this.mesh.position.x, this.mesh.position.y, this.mesh.position.z - 0.01 )
      }
    }
  }

  scaleX(amt){
    this.mesh.scale.x += amt
  }

  scaleY(amt){
    this.mesh.scale.y += amt
  }

  scaleZ(amt){
    this.mesh.scale.z += amt
  }

  rotateX(amt){
    this.mesh.rotation.x += amt
  }

  rotateY(amt){
    this.mesh.rotation.y += amt
  }

  rotateZ(amt){
    this.mesh.rotation.z += amt
  }

  remove(){
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
    scene.remove(this.mesh)
  }

  name(){
    return ""
  }

}

export { Shape }
