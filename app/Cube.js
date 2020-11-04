import * as THREE from "./three.module.js"
import { Shape } from "./Shape.js"
import { Util } from "./Util.js"

class Cube extends Shape {
  constructor(dimX,dimY,dimZ){
    super(new THREE.BoxGeometry( dimX, dimY, dimZ ))
    this.dimX = dimX
    this.dimY = dimY
    this.dimZ = dimZ
    this.name = "Cube " + this.id
  }

  duplicate(){
    var dupe = new Cube(this.dimX, this.dimY, this.dimZ)
    dupe.mesh.position.set(this.mesh.position.x,this.mesh.position.y,this.mesh.position.z)
    dupe.mesh.scale.x = this.mesh.scale.x
    dupe.mesh.scale.y = this.mesh.scale.y
    dupe.mesh.scale.z = this.mesh.scale.z
    dupe.mesh.rotation.x = this.mesh.rotation.x
    dupe.mesh.rotation.y = this.mesh.rotation.y
    dupe.mesh.rotation.z = this.mesh.rotation.z
    return dupe
  }

  remove(scene){
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
    scene.remove(this.mesh)
  }

  print(){
    let str = "var shape" + this.id + " = new THREE.Mesh( new THREE.BoxGeometry( " + this.dimX*this.mesh.scale.x + "," + this.dimY*this.mesh.scale.y + "," + this.dimZ*this.mesh.scale.z +  " ), new THREE.MeshStandardMaterial( { color: '" + this.color + "', transparent: true }))\nshape" + this.id + ".position.set(" + this.mesh.position.x + "," + this.mesh.position.y + "," + this.mesh.position.z + ")\nshape" + this.id + ".rotation.set(" + this.mesh.rotation.x + "," + this.mesh.rotation.y + ","+ this.mesh.rotation.z + ")\ngroup.add ( shape" + this.id + " )\n\n"

    return str
  }

  printCharacter(origin){
    let color = new Util().hexToRgb(this.color)

    let posx,posy,posz
    console.log( 'oirin', origin )
    posx = this.mesh.position.x + origin[0]
    posy = this.mesh.position.y + origin[1]
    posz = this.mesh.position.z + origin[2]

    let str = "var char" + this.id + " = new Character( new THREE.BoxGeometry( " + this.dimX*this.mesh.scale.x + "," + this.dimY*this.mesh.scale.y + "," + this.dimZ*this.mesh.scale.z +  " ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [" + color[0] + "," + color[1] + "," + color[2] + "], new THREE.MeshStandardMaterial( { color: '" + this.color + "', transparent: true }) )\nchar" + this.id + ".mesh.position.set(" + (posx) + "," + (posy) + "," + (posz) + ")\nchar" + this.id + ".mesh.rotation.set(" + this.mesh.rotation.x + "," + this.mesh.rotation.y + ","+ this.mesh.rotation.z + ")\nscene.add( char" + this.id + ".mesh )\ncharacters[char" + this.id + ".mesh.id] = char" + this.id + "\n\n"
    return str
  }

}

export { Cube }
