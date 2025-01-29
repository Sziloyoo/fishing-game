import Experience from '../Experience.js'
import Environment from './Environment.js'
import Level from './Level.js'
import Water from './Water.js'
import Daxter from './Daxter.js'
import Jak from './Jak.js'
import Spawner from './Spawner.js'
import Sound from './Sound.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.controls = this.experience.controls
        this.camera = this.experience.camera
        this.debug = this.experience.debug
        this.state = 'start'

        this.running = false

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.environment = new Environment()
            this.level = new Level()
            this.water = new Water()
            this.daxter = new Daxter()
            this.jak = new Jak()
            this.spawner = new Spawner()
            this.sound = new Sound()
        })

        // Start game
        this.playButton = document.getElementById('play-button')
        this.playButton.addEventListener("click", () => this.startGame())

        // Pause game
        if(this.debug.active){
            document.addEventListener('keydown', (e) => this.escEvent(e))
        }
        
        // Play again
        this.playButton = document.getElementById('again-button')
        this.playButton.addEventListener("click", () => this.playAgain())
    }

    update(){
        if(!this.running) return

        if(this.water != undefined){
            this.water.updateWater()
        }
        if(this.daxter != undefined){
            this.daxter.update()
        }
        if(this.jak != undefined){
            this.jak.update()
        }
        if(this.spawner != undefined){
            this.spawner.update()
        }
    }

    startGame(){
        document.getElementById('start-screen').style.visibility = "hidden"
        document.getElementById('text-holder').requestPointerLock()
        this.sound.playMusic()
        this.running = true
        this.state = "running"
    }

    escEvent(e){
        if(e.keyCode === 27 && this.state === "running"){
            if(this.running){
                document.getElementById('pause').style.visibility = "visible"
                document.getElementById('text-holder').style.cursor = "default"
                document.exitPointerLock()
                this.sound.pauseMusic()
                this.running = false
            }
            else{
                document.getElementById('pause').style.visibility = "hidden"
                document.getElementById('text-holder').style.cursor = "none"
                document.getElementById('text-holder').requestPointerLock()
                this.sound.playMusic()
                this.running = true
            }
        }
        
    }

    endGame(){
        document.getElementById('end-screen').style.visibility = "visible"
        document.exitPointerLock()
        this.running = false
        this.state = "end"
    }

    playAgain(){
        document.getElementById('end-screen').style.visibility = "hidden"
        this.spawner.remove()
        this.spawner = null
        this.spawner = new Spawner()
        this.experience.player.reset()
        this.sound.refresh()
        document.getElementById('text-holder').requestPointerLock()
        this.experience.controls.reset()
        this.running = true
        this.state = "running"
    }
}