import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('camera')
        }

        this.setInstance()
        //this.setControls()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(24, this.sizes.width / this.sizes.height, 0.1, 10000)
        this.instance.position.set(0, 4, 7.2)
        this.instance.rotation.x = -0.5899213
        this.scene.add(this.instance)

        if(this.debug.active){
            this.debugFolder
            .add(this.instance.position, 'y')
            .name('camPosY')
            .min(0)
            .max(10)
            .step(0.001),
            this.debugFolder
            .add(this.instance.position, 'z')
            .name('camPosZ')
            .min(0)
            .max(10)
            .step(0.001),
            this.debugFolder
            .add(this.instance.rotation, 'x')
            .name('camRotX')
            .min(-1.5708)
            .max(1.5708)
            .step(0.001)
        }
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 1;
        this.controls.maxDistance = 20;
        this.controls.maxPolarAngle = Math.PI / 2;
        this.controls.target.set(0, 0, 0);
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
       //this.controls.update()
    }
}