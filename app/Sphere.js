import * as THREE from "./three.module.js"
import { Shape } from "./Shape.js"

class Sphere extends Shape {
  constructor(radius){
    super(new THREE.SphereGeometry( radius, 32 ))

    this.name = "Sphere " + this.id
    this.radius = radius
  }

  remove(scene){
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
    scene.remove(this.mesh)
  }


  print(){
    let str = "var shape" + this.id + " = new THREE.Mesh( new THREE.SphereGeometry( " + this.radius + ", 32, 32 ), new THREE.MeshStandardMaterial( { color: '" + this.color + "', transparent: true }))\nshape" + this.id + ".position.set(" + this.mesh.position.x + "," + this.mesh.position.y + "," + this.mesh.position.z + ")\nshape" + this.id + ".rotation.set(" + this.mesh.rotation.x + "," + this.mesh.rotation.y + ","+ this.mesh.rotation.z + ")\ngroup.add ( shape" + this.id + " )\n\n"

    return str
  }

  printCharacter(){
    let str = "var char" + this.id + " = new Character( new THREE.SphereGeometry( " + this.radius + ", 32, 32 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [255,255,255], new THREE.MeshStandardMaterial( { color: '" + this.color + "', transparent: true }) )\nchar" + this.id + ".mesh.position.set(" + (this.mesh.position.x + origin[0]) + "," + (this.mesh.position.y + origin[1]) + "," + (this.mesh.position.z + origin[2]) + ")\nchar" + this.id + ".mesh.rotation.set(" + this.mesh.rotation.x + "," + this.mesh.rotation.y + ","+ this.mesh.rotation.z + ")\nscene.add( char" + this.id + ".mesh )\ncharacters[char" + this.id + ".mesh.id] = char" + this.id + "\n\n"
    return str
  }


}

export { Sphere }
