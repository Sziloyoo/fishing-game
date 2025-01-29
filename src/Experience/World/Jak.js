import * as THREE from 'three'
import Experience from '../Experience'

export default class Daxter{
    
    constructor(){
        this.experience = new Experience()
        this.resource = this.experience.resources.items.jak
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.controls = this.experience.controls
        this.net = this.experience.resources.items.net
        this.collider = this.experience.collider
        this.netPivot = new THREE.Object3D()
        this.headBone
        this.spine2Bone
        this.spine1Bone
        this.rootBone

        this.setJak()
        this.model.traverse(o => {
            if(o.isBone && o.name === 'head'){
                this.headBone = o
            }
            if(o.isBone && o.name === 'spine2'){
                this.spine2Bone = o
            }
            if(o.isBone && o.name === 'spine1'){
                this.spine1Bone = o
            }
            if(o.isBone && o.name === 'root'){
                this.rootBone = o
            }
        })

        this.setNet()
        //this.setDebug()
    }

    setJak(){
        this.model = this.resource.scene
        this.model.position.set(-0.09, -2, 0)
        this.scene.add(this.model)
    }

    setNet(){
        this.fishingNet = this.net.scene

        this.netPivot.position.z = 3.2
        this.netPivot.add(this.fishingNet)
        this.fishingNet.position.set(0, -0.2, -1.2)
        this.fishingNet.rotation.y = -Math.PI
        this.fishingNet.rotation.x = -0.349066
        this.scene.add(this.netPivot)
    }

    setDebug(){
        if(this.debug.active){
            /* this.debugFolder.add(this.headBone.rotation, 'y')
            .name('headRotationY')
            .min(-0.75)
            .max(0.75)
            .step(0.001),
            this.debugFolder.add(this.spine2Bone.rotation, 'z')
            .name('spineRotationZ')
            .min(-0.75)
            .max(0.75)
            .step(0.001),
            this.debugFolder.add(this.spine1Bone.rotation, 'z')
            .name('spineRotationZ')
            .min(-0.75)
            .max(0.75)
            .step(0.001),
            this.debugFolder.add(this.netPivot.rotation, 'y')
            .name('netRotation')
            .min(-1.5708)
            .max(1.5708)
            .step(0.001) */
        }
    }

    update(){
        if(this.controls.mouse.x > -0.28){
            this.netPivot.rotation.y = -0.6629985489078778
        }
        if(this.controls.mouse.x < 0.28){
            this.netPivot.rotation.y = 0.669551701855418
        }
        if(this.controls.mouse.x < 0.28 && this.controls.mouse.x > -0.28){
            this.headBone.rotation.y = this.controls.mouse.x * -1.5
            this.spine1Bone.rotation.z = this.controls.mouse.x * 0.5
            this.spine2Bone.rotation.z = this.controls.mouse.x * 0.5
            this.netPivot.rotation.y = -Math.tan(this.collider.cmesh.position.x/2.3)
            this.fishingNet.scale.z = 1.0 + Math.abs(this.controls.mouse.x) * 2
        }
    }
    
}