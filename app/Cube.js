import * as THREE from "./three.module.js"
import { Shape } from "./Shape.js"

class Cube extends Shape {
  constructor(dimX,dimY,dimZ){
    super(new THREE.BoxGeometry( dimX, dimY, dimZ ))
  }

  remove(){
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
    scene.remove(this.mesh)
  }

  print(){
    let str = "let shape" + this.id + " = new THREE.Mesh( new THREE.BoxGeometry( " + this.mesh.scale.x + "," + this.mesh.scale.y + "," + this.mesh.scale.z +  " ), new THREE.MeshBasicMaterial( { color: '" + this.color + "', transparent: true }))\nshape" + this.id + ".mesh.position.set(" + this.mesh.position.x + "," + this.mesh.position.y + "," + this.mesh.position.z + ")\nthis.mesh.rotation.set(" + this.mesh.rotation.x + "," + this.mesh.rotation.y + ","+ this.mesh.rotation.z + ")\nscene.add ( shape" + this.id + " )"

    return str
  }

}

export { Cube }
