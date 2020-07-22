import "phaser"

export default class characterSelector extends Phaser.GameObjects.GameObject{
    constructor(scene, x, y, width, height, character){
        super(scene, "characterSelector");
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.character = character;
        this.ox = 0; this.oy = 0;
        this.state = {
            selected: false
        }
    }

    setOrigin(x, y){
        this.ox = x;
        this.oy = y;
    }

    toggleSelected(){
        this.state.selected = !this.state.selected;
        if(this.state.selected) this.select();
        else this.selectorHover();
    }

    clearSelected(){
        this.state.selected = false;
        this.selectorOut();
    }
    
    
    render(){
        this.characterBox = this.scene.add.rectangle(this.x, this.y, this.width, this.height, 0xffffff)
        .setOrigin(this.ox, this.oy)
        .setInteractive({cursor: 'pointer'})
        .on('pointerover', () => this.selectorHover())
        .on('pointerout' , () =>   this.selectorOut())
        .on('pointerdown', () => this.handleClick(this.character.name));
        this.scene.add.text(this.x + this.width/2, this.y + this.height + 5, this.character.name, {fontSize: '10px'}).setOrigin(.5, .5);
        this.sprite = this.scene.add
        .image(this.x + this.width/2, this.y + this.height - 2.5, this.character.name + '_model')
        .setOrigin(0.5, 1)
        .setTintFill(this.state.selected == true ? 0xffffff : 0x333333);
    }

    handleClick(selected){
        this.scene.changeSelected(selected);
    }

    selectorHover(){
        if(!this.state.selected){
            this.characterBox.setStrokeStyle(2, 0xff0000);
            this.sprite.clearTint();
        }

        
    }
    selectorOut(){
        if(!this.state.selected){
            this.characterBox.setStrokeStyle();
            this.sprite.setTintFill(0x333333);
        }
    }
    select(){
        this.state.selected = true;
        this.characterBox.setStrokeStyle();
        this.characterBox.setStrokeStyle(2, 0x00ff00);
        this.sprite.clearTint();
    }
}