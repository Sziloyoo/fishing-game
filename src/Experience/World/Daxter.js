import Experience from '../Experience'

export default class Daxter{
    
    constructor(){
        this.experience = new Experience()
        this.resource = this.experience.resources.items.daxter
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.controls = this.experience.controls
        this.headBone
        this.spineBone

        // Debug
        /* if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('daxter')
        } */

        this.setDaxter()
        this.model.traverse(o => {
            if(o.isBone && o.name === 'Head'){
                this.headBone = o
            }
            if(o.isBone && o.name === 'Spine2'){
                this.spineBone = o
            }
        })

        //this.setDebug()
    }

    setDaxter(){
        this.model = this.resource.scene
        this.model.position.set(0, -2, 0)
        this.scene.add(this.model)
    }

    setDebug(){
        if(this.debug.active){
            this.debugFolder.add(this.headBone.rotation, 'y')
            .name('headRotationY')
            .min(-0.75)
            .max(0.75)
            .step(0.001),
            this.debugFolder.add(this.spineBone.rotation, 'y')
            .name('spineRotationY')
            .min(-0.1)
            .max(0.1)
            .step(0.001)
        }
    }

    update(){
        if(this.controls.mouse.x < 0.28 && this.controls.mouse.x > -0.28){
            this.headBone.rotation.y = this.controls.mouse.x * -2
            this.spineBone.rotation.y = this.controls.mouse.x * -0.3
        }
        
    }
    
}