import EventEmitter from './EventEmitter.js'
import Experience from '../Experience.js'

export default class Sizes extends EventEmitter
{
    constructor()
    {
        super()

        this.experience = new Experience()
        this.canvas = this.experience.canvas

        // Setup
        // If screen narrower than 16:9
        if(window.innerWidth/window.innerHeight > 1.77777777778){
            this.height = window.innerHeight
            this.width = this.height * 1.77777777778
        }
        // If screen wider than 16:9
        else{
            this.width = window.innerWidth
            this.height = this.width * 0.5625
        }
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        // Resize event
        window.addEventListener('resize', () =>
        {
            // If screen narrower than 16:9
            if(window.innerWidth/window.innerHeight > 1.77777777778){
                this.height = window.innerHeight
                this.width = this.height * 1.77777777778
            }
            // If screen wider than 16:9
            else{
                this.width = window.innerWidth
                this.height = this.width * 0.5625
            }
            
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)
            this.trigger('resize')
        })

        // Fullscreen
        window.addEventListener('keydown', (event) => {
            if(event.key == 'f'){
                if(!document.fullscreenElement){
                    this.canvas.requestFullscreen()
                }
                else{
                    document.exitFullscreen()
                }
            }
        })
    }
}