import * as THREE from "./three.module.js"
import { Shape } from "./Shape.js"

class Cube extends Shape {
  constructor(dimX,dimY,dimZ){
    super(new THREE.BoxGeometry( dimX, dimY, dimZ ))
    this.dimX = dimX
    this.dimY = dimY
    this.dimZ = dimZ
    this.name = "Cube " + this.id

  }

  remove(scene){
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
    scene.remove(this.mesh)
  }

  print(){
    let str = "let shape" + this.id + " = new THREE.Mesh( new THREE.BoxGeometry( " + this.dimX*this.mesh.scale.x + "," + this.dimY*this.mesh.scale.y + "," + this.dimZ*this.mesh.scale.z +  " ), new THREE.MeshStandardMaterial( { color: '" + this.color + "', transparent: true }))\nshape" + this.id + ".mesh.position.set(" + this.mesh.position.x + "," + this.mesh.position.y + "," + this.mesh.position.z + ")\nthis.mesh.rotation.set(" + this.mesh.rotation.x + "," + this.mesh.rotation.y + ","+ this.mesh.rotation.z + ")\ngroup.add ( shape" + this.id + " )\n\n"

    return str
  }

}

export { Cube }
