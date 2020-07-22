import 'phaser'

export default class menu extends Phaser.Scene{
    constructor(){
        super('menu');
    }

    create(){
        this.add.bitmapText(100, 50, 'AGoblinAppears', 'Hana and Joao Adventure!', 7).setOrigin(.5, .5);
        // this.add.text(100, 50, 'Hana and Joao Adventure!', {fontSize: '10px'}).setOrigin(.5, .5);
        this.playButton = this.add.text(100, 100, 'Play').setOrigin(.5, .5)
        .setInteractive({cursor: 'pointer'})
        .on('pointerover', () => this.buttonHover())
        .on('pointerdown', () => this.buttonPress())
        .on('pointerout' , () =>   this.buttonOut());
    }

    buttonHover(){
        this.playButton.setStyle({fill: 'red'})
    }
    buttonOut(){
        this.playButton.setStyle({fill: 'white'})
    }
    buttonPress(){
        
        this.scene.start('selectMenu');
    }
}