import * as THREE from "./three.module.js"
// import { Timer } from "./timer.js"

class Shape {
  constructor(geo){
    this.id = Math.random().toString(36).slice(2)
    this.color = rgbToHex(Math.floor( Math.random() * 255 ), Math.floor( Math.random() * 255 ), Math.floor( Math.random() * 255 ))
    this.mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial( { color: this.color, transparent: true }))

    if(!this.name){
      this.name = "Shape " + this.id
    }
  }

  move(keyName){
    if(keyName == 'ArrowLeft'){
      this.mesh.position.set( this.mesh.position.x + 0.01, this.mesh.position.y, this.mesh.position.z )
    } else if(keyName == 'ArrowRight'){
      this.mesh.position.set( this.mesh.position.x - 0.01, this.mesh.position.y, this.mesh.position.z )

    } else if(keyName == 'ArrowUp'){
      this.mesh.position.set( this.mesh.position.x, this.mesh.position.y + 0.01 , this.mesh.position.z )

    } else if(keyName == 'ArrowDown'){
      this.mesh.position.set( this.mesh.position.x, this.mesh.position.y - 0.01, this.mesh.position.z )
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
