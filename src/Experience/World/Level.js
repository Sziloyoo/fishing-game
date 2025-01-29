import Experience from '../Experience'
import * as THREE from 'three'

export default class Level{

    constructor(){
        this.experience = new Experience
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.resource = this.resources.items.level

        // Level color texture and material
        this.levelAlbedo_texture = this.resources.items.level_albedo
        this.levelAlbedo_texture.flipY = false
        this.levelAlbedo_texture.encoding = THREE.sRGBEncoding
        this.levelMaterial = new THREE.MeshBasicMaterial({ map: this.levelAlbedo_texture })

        // Foliage color, opacity texture and material
        this.foliageAlbedo_texture = this.resources.items.foliage_albedo
        this.foliageAlbedo_texture.flipY = false
        this.foliageAlbedo_texture.encoding = THREE.sRGBEncoding
        this.foliageOpacity_texture = this.resources.items.foliage_opacity
        this.foliageOpacity_texture.flipY = false
        this.foliageOpacity_texture.encoding = THREE.sRGBEncoding
        this.foliageMaterial = new THREE.MeshBasicMaterial({ map: this.foliageAlbedo_texture, alphaMap: this.foliageOpacity_texture })
        this.foliageMaterial.transparent = true

        // Lamp material
        this.emission_albedo_texture = this.resources.items.emission_albedo
        this.emission_albedo_texture.flipY = false
        this.emission_albedo_texture.encoding = THREE.sRGBEncoding
        this.lampMaterial = new THREE.MeshBasicMaterial({ map: this.emission_albedo_texture })

        this.setLevel()
    }
    setLevel(){
        this.model = this.resource.scene
        this.model.position.y = -2
        this.model.traverse((child) => {

            if(child.name == "default"){
                child.material = this.levelMaterial
            }
            else if(child.name == "transparent"){
                child.material = this.foliageMaterial
            }
            else if(child.name == "emission"){
                child.material = this.lampMaterial
            }
            
        })
        this.scene.add(this.model)
    }
}