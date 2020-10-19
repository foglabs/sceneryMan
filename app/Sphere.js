import * as THREE from "./three.module.js"
import { Shape } from "./Shape.js"

class Sphere extends Shape {
  constructor(radius){
    super(new THREE.SphereGeometry( radius, 32 ))

    this.name = "Sphere " + this.id
  }

  remove(scene){
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
    scene.remove(this.mesh)
  }

  print(){
    let str = "var shape" + this.id + " = new THREE.Mesh( new THREE.SphereGeometry( " + this.mesh.geometry.radius + ", 32, 32 ), new THREE.MeshBasicMaterial( { color: '" + this.color + "', transparent: true }))\nshape" + this.id + ".position.set(" + this.mesh.position.x + "," + this.mesh.position.y + "," + this.mesh.position.z + ")\nshape" + this.id + ".rotation.set(" + this.mesh.rotation.x + "," + this.mesh.rotation.y + ","+ this.mesh.rotation.z + ")\ngroup.add ( shape" + this.id + " )\n\n"

    return str
  }

}

export { Sphere }
