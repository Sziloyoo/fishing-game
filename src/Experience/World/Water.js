import * as THREE from 'three'
import Experience from '../Experience'
import vertexShader from '../Shaders/Water/vertex.glsl'
import fragmentShader from '../Shaders/Water/fragment.glsl'

export default class Water{
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('water')
        }

        this.setWater()
    }

    setWater(){
        // Geometry
        this.geo = new THREE.PlaneBufferGeometry(8, 8, 32, 32)
        this.geo.rotateX(- Math.PI / 2)
        this.geo.rotateY(Math.PI / 2)

        // Texture
        this.displacement_texture = this.resources.items.water_displacement
        this.displacement_texture.wrapS = THREE.RepeatWrapping
        this.displacement_texture.wrapT = THREE.RepeatWrapping

        this.color_texture = this.resources.items.water_color
        this.color_texture.wrapS = THREE.RepeatWrapping
        this.color_texture.wrapT = THREE.RepeatWrapping

        this.flow_texture = this.resources.items.water_flowmap

        // Shader
        this.waterShader = new THREE.RawShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
            wireframe: false,
            uniforms: {
                uDisplace: { value: this.displacement_texture },
                uTexture: { value: this.color_texture},
                uFlowmap: { value: this.flow_texture },
                uTime: { value: this.time.elapsed * 0.001 },
                uParam: { value: new THREE.Vector2(0.58, 0.1) },
                uTiling: { value: 2.5 },
                uTransparency: { value: 0.4 }
            }
        })

        // Debug settings
        if(this.debug.active){
            this.debugFolder
            .add(this.waterShader.uniforms.uParam.value, 'x')
            .name('amplitude')
            .min(0)
            .max(1)
            .step(0.001),
            this.debugFolder
            .add(this.waterShader.uniforms.uParam.value, 'y')
            .name('speed')
            .min(0)
            .max(3)
            .step(0.001),
            this.debugFolder
            .add(this.waterShader.uniforms.uTransparency, 'value')
            .name('transparency')
            .min(0)
            .max(1)
            .step(0.001),
            this.debugFolder
            .add(this.waterShader.uniforms.uTiling, 'value')
            .name('tiling')
            .min(0.1)
            .max(4.0)
            .step(0.01),
            this.debugFolder
            .add(this.waterShader, 'wireframe')
            .name('wireframe')
        }

        // Finish
        this.mesh = new THREE.Mesh(this.geo, this.waterShader)
        this.mesh.position.y = -0.56
        this.scene.add(this.mesh)
    }

    updateWater(){
        this.waterShader.uniforms.uTime.value = this.time.elapsed * 0.001
    }
}