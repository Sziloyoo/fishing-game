import * as THREE from 'three'
import Experience from '../Experience.js'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';

export default class Fish{
    constructor(type, speed){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.time = this.experience.time
        this.collider = new THREE.Mesh(new THREE.SphereBufferGeometry(0.1, 5, 5), new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true}))
        this.speed = speed
        this.type = type
        this.active = true
        this.tailBone
        this.rootBone
        this.randomPhase = Math.random() * 5

        switch(type){
            case 0:
                this.model = SkeletonUtils.clone(this.resources.items.smallFish.scene)
                this.smallFish_texture = this.resources.items.smallFish_texture
                this.smallFish_texture.flipY = false
                this.smallFish_texture.encoding = THREE.sRGBEncoding
                this.smallFish_material = new THREE.MeshBasicMaterial({ map: this.smallFish_texture })

                this.model.traverse((child) => {
                    child.material = this.smallFish_material
                    if(child.isBone && child.name === 'tail'){
                        this.tailBone = child
                    }
                    if(child.isBone && child.name === 'root'){
                        this.rootBone = child
                    }
                })

                break
            
            case 1:
                this.model = SkeletonUtils.clone(this.resources.items.bigFish.scene)
                this.bigFish_texture = this.resources.items.bigFish_texture
                this.bigFish_texture.flipY = false
                this.bigFish_texture.encoding = THREE.sRGBEncoding
                this.bigFish_material = new THREE.MeshBasicMaterial({ map: this.bigFish_texture })

                this.model.traverse((child) => {
                    child.material = this.bigFish_material
                    if(child.isBone && child.name === 'tail'){
                        this.tailBone = child
                    }
                    if(child.isBone && child.name === 'root'){
                        this.rootBone = child
                    }
                })

                break

            case 2:
                this.model = SkeletonUtils.clone(this.resources.items.badFish.scene)
                this.badFish_texture = this.resources.items.badFish_texture
                this.badFish_texture.flipY = false
                this.badFish_texture.encoding = THREE.sRGBEncoding
                this.badFish_material = new THREE.MeshBasicMaterial({ map: this.badFish_texture })
                
                this.model.traverse((child) => {
                    child.material = this.badFish_material
                    if(child.isBone && child.name === 'tail'){
                        this.tailBone = child
                    }
                    if(child.isBone && child.name === 'root'){
                        this.rootBone = child
                    }
                })

                break
        }
        
        this.model.scale.set(1.3, 1.3, 1.3)
        this.model.position.set(0, -0.5, -5)
        this.collider.position.set(0, -0.5, -5)
        this.scene.add(this.model)
        //this.scene.add(this.collider)
    }

    update(){
        let swingAmount = 0.3
        if(this.type == 2) swingAmount = 0.15
        this.model.position.z += this.speed
        this.collider.position.z += this.speed
        this.tailBone.rotation.z = Math.sin(this.time.elapsed * this.speed * 0.4 + this.randomPhase) * swingAmount
        this.rootBone.rotation.y = Math.sin(this.time.elapsed * this.speed * 0.4 + this.randomPhase / 2) * swingAmount * 0.3
    }

    start(x, y, z){
        this.model.position.set(x, y, z)
        this.collider.position.set(x, y, z)
    }

    getPos(){
        return this.model.position.z
    }

    die(){
        this.model.visible = false
        this.collider.visible = false
    }


}