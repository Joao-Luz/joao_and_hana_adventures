import 'phaser'
import characters from '../config/characters'



export default class dog extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, id, x, y){
        const config = characters[id];
        super(scene, x, y, characters[id].character);     

        this.startX = x;
        this.sounds = config.sounds.reduce((a, sound) => (a[sound.key] = this.scene.sound.add(sound.key, sound.config), a), {});
        this.scene = scene;
        this.character = config.character;
        this.animations = config.anims;
        this.state = {
        }

        this.play(this.animations.wait.key);
        this.scene.add.existing(this);
    }


    onAnimationcomplete(anim, anims) {
        var next = anims.shift();
    
        if (next) {
            this.play(next);
        } else {
            this.off("animationcomplete");
        }
      };

    stop(){
        this.setFlipX(true);
        this.play(this.animations.stop.key, false, 19).once("animationcomplete", function(anim) {
            console.log('Something')
            this.play(this.animations.run.key),
            this.scene.tweens.add({
                targets: this,
                x: 60,
                duration: 500,
                onComplete: function() {
                    this.setFlipX(false);
                    this.play(this.animations.stop.key)
                    .on('animationcomplete', function() {
                        this.play(this.animations.wait.key);
                    })
                },
                onCompleteScope: this
            });
        });
        console.log(this.listenerCount('animationComplete'));
    }

    start(){
        const anims = [this.animations.bark.key, this.animations.run.key];
        this.scene.time.addEvent({
            delay: 150,
            callback: function() {
                this.sounds['bark'].once('complete', function(){this.sounds['bark'].play()}, this);
                this.sounds['bark'].play();
            },
            callbackScope: this
        })
        this.play(anims.shift()).on("animationcomplete", function(anim) {this.onAnimationcomplete(anim, anims)});
    }

    reset(){
        this.play(this.animations.wait.key);
    }
}