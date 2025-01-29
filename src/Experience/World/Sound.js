import Experience from "../Experience";

export default class Sound{
    constructor(){
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.spawner = this.experience.world.spawner

        // Sounds
        this.smallFish = this.resources.items.smallFish_sound
        this.bigFish = this.resources.items.bigFish_sound
        this.lose = this.resources.items.lose_sound
        this.miss = this.resources.items.miss_sound
        
        // Music
        this.music = this.resources.items.music

        this.music.addEventListener('ended', () => {
            this.music.play()
        })

        // Volumes
        this.smallFish.volume = 0.75
        this.bigFish.volume = 0.5
        this.miss.volume = 0.4
        this.lose.volume = 0.75
        this.music.volume = 0.3

        // Events
        this.spawner.on('small', () =>
        {
            this.playSmall()
        })

        this.spawner.on('big', () =>
        {
            this.playBig()
        })

        this.spawner.on('miss', () =>
        {
            this.playMiss()
        })

        this.spawner.on('lose', () =>
        {
            this.playLose()
        })
    }

    playSmall(){
        this.smallFish.currentTime = 0;
        this.smallFish.play()
    }

    playBig(){
        this.bigFish.currentTime = 0;
        this.bigFish.play()
    }

    playMiss(){
        this.miss.currentTime = 0;
        this.miss.play()
    }

    playLose(){
        this.lose.play()
    }

    playMusic(){
        this.music.play()
    }

    pauseMusic(){
        this.music.pause()
    }

    refresh(){
        this.spawner = this.experience.world.spawner

        // Events
        this.spawner.on('small', () =>
        {
            this.playSmall()
        })

        this.spawner.on('big', () =>
        {
            this.playBig()
        })

        this.spawner.on('miss', () =>
        {
            this.playMiss()
        })

        this.spawner.on('lose', () =>
        {
            this.playLose()
        })
    }
}