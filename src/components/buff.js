import 'phaser'
import characters from '../config/characters'



export default class heart extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, id, x, y){
        const config = characters[id];
        super(scene, x, y, characters[id].character);     

        this.sounds = config.sounds.reduce((a, sound) => (a[sound.key] = this.scene.sound.add(sound.key, sound.config), a), {});
        this.scene = scene;
        this.character = config.character;
        this.animations = config.anims;
        this.state = {
        }

        this.scene.add.existing(this);
    }

    reset(){
        this.play(this.animations.wait.key);
    }
}