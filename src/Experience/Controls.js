import EventEmitter from "./Utils/EventEmitter"
import Experience from './Experience'
import * as THREE from "three"

export default class Controls extends EventEmitter{
    constructor(){
        super()
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.mouse = new THREE.Vector2()

        /* window.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX - this.sizes.width/2) / this.sizes.width
            this.trigger('move')
        }) */

        window.addEventListener('mousemove', (event) => {
            if(this.experience.world.state != "running") return
            if(this.mouse.x < -0.3){
                this.mouse.x = -0.3
                return
            }
            if(this.mouse.x > 0.3){
                this.mouse.x = 0.3
                return
            }

            this.mouse.x += event.movementX * 0.001
            this.trigger('move')
        })

        window.addEventListener('touchmove', (event) => {
            ;[...event.changedTouches].forEach(touch => {
                this.mouse.x = (touch.pageX - this.sizes.width/2) / this.sizes.width
            })
            this.trigger('move')
        })
    }

    reset(){
        this.mouse.x = 0
    }
}