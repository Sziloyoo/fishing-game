import * as THREE from 'three'
import { Color } from 'three'
import Experience from '../Experience.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('environment')
        }

        this.setLampLights()
        this.setWorldAxes()
        this.setAmbientLight()
    }

    setAmbientLight(){
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
        this.scene.add(this.ambientLight)

        //Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.ambientLight, 'intensity')
                .name('ambientLight')
                .min(0)
                .max(1)
                .step(0.01)
        }
    }

    setLampLights(){
        this.pointLight2 = new THREE.PointLight(0xf9a724, 2, 5);
        this.pointLight2.position.y = 0.5;
        this.pointLight2.position.z = 2.0;
        this.pointLight2.position.x = 1.8;
        this.scene.add(this.pointLight2)

        this.pointLight1 = new THREE.PointLight(0xf9a724, 2, 5);
        this.pointLight1.position.y = 0.5;
        this.pointLight1.position.z = 2.5;
        this.pointLight1.position.x = -1.75;
        this.scene.add(this.pointLight1)

        /* this.pointLightHelper2 = new THREE.PointLightHelper(this.pointLight2, 0.2, 0xFFA500);
        this.scene.add(this.pointLightHelper2);

        this.pointLightHelper1 = new THREE.PointLightHelper(this.pointLight1, 0.2, 0xFFA500);
        this.scene.add(this.pointLightHelper1); */

        //Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.pointLight2 && this.pointLight1, 'intensity')
                .name('lampsIntensity')
                .min(0)
                .max(5)
                .step(0.001)
        }
    }

    setWorldAxes(){
        this.origin = new THREE.AxesHelper(1)
        this.scene.add(this.origin)
        this.origin.visible = false

        //Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.origin, 'visible')
                .name('worldOrigin')
        }
    }
}