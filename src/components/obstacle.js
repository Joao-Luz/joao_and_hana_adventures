import 'phaser'
import characters from '../config/characters'

export default class obstacle extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, id, x, y){
        const config = characters[id];
        super(scene, x, y + (config.offsetY == null ? 0 : config.offsetY), config.texture);  

        if(config.anims != null) this.play(config.anims);

        this.scene = scene;
        this.character = config.character;
        this.speed = config.speed;
        this.state = {
        };

        this.scene.add.existing(this, false);
    }

    handleMovement(multiplyer = 1.0){
        this.x -= this.speed * multiplyer;
        this.refreshBody();
    }

    reset(){
        this.state.dead = false;
        this.state.tangeble = true;
        this.state.life = 3;
        this.setTexture('hana_game'); this.play('hana_anim');
    }
}