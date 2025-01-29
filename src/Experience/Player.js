import Experience from './Experience.js'

export default class Player{
    constructor(){
        this.experience = new Experience()
        this.spawner

        // To display
        this.caught = 0
        this.missed = 0

        this.treshold = 20

        this.caughtDomElement = document.getElementById('caught')
        this.missedDomElement = document.getElementById('missed')
    }

    updateCaught(num){
        if(this.experience.world.spawner != undefined){
            this.spawner = this.experience.world.spawner
        }

        this.caught += num
        this.caughtDomElement.innerHTML = "CAUGHT: " + this.caught

        if(this.caught >= this.treshold){
            this.treshold = Math.round(this.treshold * 1.5)
            if(this.caught > 100){
                this.spawner.increaseHardness(true)
            }
            else{
                this.spawner.increaseHardness(false)
            }
            
        }
    }

    updateMissed(num){
        this.missed += num
        this.missedDomElement.innerHTML = "MISSED: " + this.missed
    }

    gameOver(why){
        console.log("Game Over!")
        if(why){
            console.log("You missed more than 20 pounds of fish!")
        }
        else{
            console.log("You caught a bad fish!")
        }

        this.experience.world.endGame()
    }

    reset(){
        this.caught = 0
        this.missed = 0
        this.treshold = 20

        this.caughtDomElement.innerHTML = "CAUGHT: " + this.caught
        this.missedDomElement.innerHTML = "MISSED: " + this.missed
    }
}