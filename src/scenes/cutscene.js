import 'phaser'

export default class cutscene extends Phaser.Scene{
    constructor(){
        super('cutscene');
    }

    create(){
        this.add.text(100, 50, 'Meg ficou doida!\nVocê pegou o frango dela e ela quer brincar!!!', {fontSize: '6px', align: 'center'}).setOrigin(.5, .5);
        this.skipButton = this.add.text(150, 125, 'Pular', {fontSize: '12px'}).setOrigin(.5, .5)
        .setInteractive({cursor: 'pointer'})
        .on('pointerover', () => this.buttonHover())
        .on('pointerdown', () => this.buttonPress())
        .on('pointerout' , () =>   this.buttonOut());
    }

    buttonHover(){
        this.skipButton.setStyle({fill: 'red'})
    }
    buttonOut(){
        this.skipButton.setStyle({fill: 'white'})
    }
    buttonPress(){
        this.scene.start('selectMenu');
    }
}