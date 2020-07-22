import "phaser"
import characterSelector from "../components/characterSelector"


export default class selectMenu extends Phaser.Scene{
    constructor(){
        super('selectMenu');
        this.state = {
            selected : false
        }
        this.changeSelected = this.changeSelected.bind(this);
    }

    create(){
        console.log('selectMenu');
        this.joaoSelector = new characterSelector(this, 50, 25, 44, 100, {name: 'joao'});
        this.hanaSelector = new characterSelector(this, 106, 25, 44, 100, {name: 'hana'});
        this.joaoSelector.render();
        this.hanaSelector.render();
        console.log(this.game.config);
    }

    changeSelected(selected){
        this.state.selected = (selected == this.state.selected ? false : selected);
        
        if(selected == 'joao'){
            this.hanaSelector.clearSelected();
            this.joaoSelector.toggleSelected();
        }
        else if(selected == 'hana'){
            this.joaoSelector.clearSelected();
            this.hanaSelector.toggleSelected();
        }

        if(this.state.selected){
            if(this.startButton == null) this.startButton = this.add.text(175, 137, 'Iniciar', {fontSize: '5px', align: 'center'})
            .setInteractive({cursor: 'pointer'})
            .on('pointerover', () => this.buttonHover())
            .on('pointerdown', () => this.buttonPress())
            .on('pointerout' , () =>   this.buttonOut());
        }
        else if(this.startButton != null){this.startButton.destroy(); this.startButton = null}
        console.log(this.state.selected, this.startButton);
    }

    buttonHover(){
        this.startButton.setStyle({fill: 'red'})
    }
    buttonOut(){
        this.startButton.setStyle({fill: 'white'})
    }
    buttonPress(){
        var selected;
        if(this.state.selected == 'joao') selected = 3;
        if(this.state.selected == 'hana') selected = 2;
        this.scene.start('game', {characterId: selected});
        
    }
}