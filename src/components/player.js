import 'phaser'
import characters from '../config/characters'

export default class player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, id, x, y, inputs){
        const config = characters[id];
        super(scene, x, y, characters[id].character);     

        this.startY = y;
        this.scene = scene;
        this.character = config.character;
        this.animations = config.anims;
        this.sounds = config.sounds.reduce((a, sound) => (a[sound.key] = this.scene.sound.add(sound.key, sound.config), a), {});
        this.jump_key = inputs.jump_key;
        this.slide_key = inputs.slide_key;
        this.state = {
            jumping: false,
            sliding: false,
            life: config.life,
            dead: false,
            tangeble: true,
            buffed: false
        }

        this.play(this.animations.run.key);
        this.scene.add.existing(this);
        console.log(this.body);
        this.scene.time.addEvent({
            delay: 10,
            callback: function() {this.body.setSize(this.animations.run.width, this.animations.run.height)},
            callbackScope: this
        })
        
    }

    getSound(key){
        return this.sounds[key];
    }

    handleMovement(){
        if(Phaser.Input.Keyboard.JustDown(this.jump_key) && this.body.touching.down && !this.state.sliding){
            this.sounds['step'].stop();
            this.sounds['jump'].play();

            this.body.velocity.y = -300;
            this.play(this.animations.jump.key);
            this.body.setSize(this.animations.jump.width, this.animations.jump.height)
            this.scene.time.addEvent({
                delay: 200,
                callback: function() {this.state.jumping = true; },
                callbackScope: this
            })
        }

        
        if(Phaser.Input.Keyboard.JustDown(this.slide_key) && this.body.touching.down && !this.state.sliding){
            this.sounds['step'].stop();
            this.sounds['slide'].play();
            this.play(this.animations.slide.key);
            this.body.setOffset(0, this.animations.slide.offsetY).setSize(this.animations.slide.width, this.animations.slide.height, false);
            this.state.sliding = true;
            this.scene.time.addEvent({
                delay: 700,
                callback: function() {
                    if(!this.state.dead){
                        this.sounds['step'].play();
                        this.state.sliding = false;
                        this.play(this.animations.run.key);
                        this.body.setSize(this.animations.run.width, this.animations.run.height);
                    }
                },
                callbackScope: this
            })
        }

        if(this.body.touching.down && this.state.jumping && !this.state.dead && !this.state.buffed){
            this.sounds['step'].play();
            this.play(this.animations.run.key);
            this.body.setSize(this.animations.run.width, this.animations.run.height)
            this.state.jumping = false;
        }
    }

    hold(){
        this.play(this.animations.hold.key, false);
        this.body.setSize(this.animations.hold.width, this.animations.hold.height);
        this.sounds['step'].stop();
    }

    damage(){
        if(this.state.tangeble){
            this.sounds['hit'].play();
            this.state.life--;
            this.state.tangeble = false;
            if(this.state.life == 0){
                this.sounds['step'].stop();
                this.scene.tweens.add({
                    targets: this,
                    x: 120,
                    ease: 'Power1',
                    duration: 500,
                    repeat: 0,
                })
                this.state.dead = true;
                this.play(this.animations.fall.key);
            }
        }
    }

    isDead(){
        return this.state.dead;
    }

    isTangeble(){
        return this.state.tangeble;
    }

    getLife(){
        return this.state.life;
    }

    setTangeble(state){
        this.state.tangeble = state;
    }

    reset(){
        this.state.dead = false;
        this.state.tangeble = true;
        this.state.life = 3;
        this.play(this.animations.run.key);
    }
}