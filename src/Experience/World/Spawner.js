import Experience from '../Experience.js'
import EventEmitter from '../Utils/EventEmitter.js'
import Fish from './Fish.js'
import * as THREE from "three"

export default class Spawner extends EventEmitter{
    constructor(){
        super()
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.collider = this.experience.collider
        this.player = this.experience.player
        this.debug = this.experience.debug

        // Important settings
        this.active = true
        this.treshold = 1000
        this.timer = 0
        this.spawnSpeed = 0.025
        this.break = 0
        this.phaseShift = 10000
        this.shift = 1

        this.running = false

        this.object = new THREE.Mesh(new THREE.SphereBufferGeometry(0.1, 3, 3), new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true}))
        this.pool = new Array()
        this.object.position.y = -0.5
        this.object.position.z = -5
        this.scene.add(this.object)

        if(this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('spawner')

            this.debugFolder
            .add(this, 'spawnSpeed')
            .name('Fish speed')
            .min(0.005)
            .max(0.5)
            .step(0.001),

            this.debugFolder
            .add(this, 'treshold')
            .name('Spawn rate')
            .min(64)
            .max(1000)
            .step(0.001)
        }
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    update(){
        // Timers
        this.timer += this.time.delta
        if(this.timer >= this.treshold){
            this.timer = 0
            this.spawnFish()
        }

        if(this.break > 0){
            this.break -= this.time.delta
        }

        if(this.phaseShift > 0){
            this.phaseShift -= this.time.delta
        }
        
        // Move spawner
        if(this.phaseShift <= 0){
            this.getNewShift()
            this.object.position.x = Math.sin(this.time.elapsed * 0.001 + this.shift) * 1.25
            this.phaseShift = Math.random() * 1000 / 2
        }

        this.object.position.x = Math.sin(this.time.elapsed * 0.001 + this.shift) * 1.25
        
        
        // Check fish instances
        for(let i = 0; i < this.pool.length; i++){

            let fish = this.pool.at(i)

            // Remove unchaugth fishes from the array
            if(fish.getPos() >= 3){
                fish.die()
                if(fish.type == 0){
                    this.player.updateMissed(1)
                    this.trigger('miss')
                }
                if(fish.type == 1){
                    this.player.updateMissed(5)
                    this.trigger('miss')
                }
                this.pool.splice(i, 1)
                if(this.player.missed >= 20){
                    this.player.gameOver(true)
                    this.trigger('lose')
                } 
                continue
            }

            // Check if the fish has been caught
            if(this.collider.cmesh.position.distanceTo(fish.model.position) <= 0.25){
                if(fish.type == 2 && fish.active){
                    fish.die()
                    this.player.gameOver(false)
                    this.pool.splice(i, 1)
                    this.trigger('lose')
                    continue
                }
                else if(fish.type == 1 && fish.active){
                    fish.die()
                    this.player.updateCaught(5)
                    this.pool.splice(i, 1)
                    this.trigger('big')
                    continue
                }
                else if(fish.type == 0 && fish.active){
                    fish.die()
                    this.player.updateCaught(1)
                    this.pool.splice(i, 1)
                    this.trigger('small')
                    continue
                }
            }

            // Update fish
            fish.update()
        }
    }

    spawnFish(){
        if(!this.active) return
        if(this.break > 0) return
        let random = this.getRndInteger(0, 3)
        let fish = new Fish(random, this.spawnSpeed)
        this.pool.push(fish)
        fish.start(this.object.position.x, this.object.position.y, this.object.position.z)
    }

    increaseHardness(bool){
        this.treshold *= 0.9
        this.spawnSpeed *= 1.1
        if(bool){
            this.break = 250
        }
        this.break = 2000
    }

    getNewShift(){
        this.shift = this.getRndInteger(1, 4)
    }

    remove(){
        this.object.visible = false
        for(let i = 0; i < this.pool.length; i++){
            let fish = this.pool.at(i)
            fish.die()
        }
    }
}