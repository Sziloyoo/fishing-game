import Experience from "./Experience.js"
import * as THREE from "three"

export default class Collider{
    
    constructor(){
        this.experience = new Experience()
        this.controls = this.experience.controls
        this.debug = this.experience.debug
        this.world = this.experience.world

        /* if(this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('collider')
        } */

        this.setCollider()

    }

    setCollider(){
        this.cgeo = new THREE.SphereBufferGeometry(0.15, 8, 8)
        this.cmat = new THREE.MeshBasicMaterial({color: 0xffff33, wireframe: true})
        this.cmesh = new THREE.Mesh(this.cgeo, this.cmat)
        this.cmesh.position.z = 1.5
        this.cmesh.position.y = -0.5
        this.cmesh.position.x = 0.12
        this.cmesh.visible = false
        this.world.scene.add(this.cmesh)

        /* if(this.debug.active){
            this.debugFolder.add(this.cmesh, 'visible')
            .name('display')
        } */
    }

    update(){
        if(this.controls.mouse.x * 5 > 1.4){
            this.cmesh.position.x = 1.4
            return
        }
        if(this.controls.mouse.x * 5 < -1.4){
            this.cmesh.position.x = -1.4
            return
        }
        this.cmesh.position.x = this.controls.mouse.x * 5
        this.cmesh.position.z = 1.2 + Math.abs(this.controls.mouse.x)
    }
}