import 'phaser'
import player from '../components/player'
import obstacle from '../components/obstacle'
import dog from '../components/dog'

const parallax_backgrounds = [
    {
        key: 'buildings',
        z_index: 3, 
        offsetY: -150
    }
]


export default class game extends Phaser.Scene{
    constructor(){
        super('game');
        this.speed = 2;
        this.state = {
            running: false,
            game_over: true,
            first_run: true,
        }
    }

    init(data){
        this.characterId = data.characterId;
        this.acceleration = 0.0005
    }

    create(){
        
        //creating physiscs groups
        this.obstacles = this.physics.add.staticGroup();
        this.runners = this.physics.add.group();
        this.player_colision = this.physics.add.staticGroup();
        this.grounds = this.physics.add.staticGroup();
        this.buffs = this.physics.add.staticGroup();

        //setting game keys
        this.reset_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.start_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        //creating game objects
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);


        this.parallax_backgrounds = [];
        for(let i = 0; i < parallax_backgrounds.length; i++){
            var background = parallax_backgrounds[i];
            var bg = this.add.tileSprite(0, 0, 200, 150, background.key).setOrigin(0, 0);
            bg.tilePositionY += background.offsetY;
            bg.setData('z_index', background.z_index);
            this.parallax_backgrounds.push(bg);
        }



        this.player = new player(this, this.characterId, -10, 125, {
            jump_key: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            slide_key: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        });
        this.runners.add(this.player);
        this.player
        .setOrigin(0.5, 1)
        .setFlipX(true)
        .setVisible(false);
        

        this.meg = new dog(this, 4, 60, 125).setOrigin(0, 1);
        this.runners.add(this.meg);

        this.ground = this.add.tileSprite(-50, 125, 256 , 25, 'ground')
        .setOrigin(0, 0);
        this.grounds.add(this.ground);

        this.background_music = this.sound.add('background_music');
        this.background_music.play({volume: 0.01, loop: true});
        

        this.obstacles.add(new obstacle(this, Math.floor(Math.random() * 2), this.game.config.width + 100, 125).setOrigin(0, 1));

        this.hearts = [this.add.image(10, 10, 'heart_full'), this.add.image(22, 10, 'heart_full'),this.add.image(34, 10, 'heart_full')];

        this.score = 0;
        this.scoreDisplay = this.add.bitmapText(this.game.config.width - 10, 10, 'AGoblinAppears', this.score.toString() + ' m', 7).setOrigin(1, 0);
        this.speedMultiplyer = 1.0;
        
        //creating the colliders
        this.physics.add.collider(this.runners, this.ground);
        this.physics.add.collider(this.obstacles, this.ground);
        this.physics.add.overlap(this.player, this.obstacles, this.damagePlayer, null, this);
        this.physics.add.overlap(this.player, this.buffs, this.buffPlayer, null, this);

        
        // this.heart = this.sound.add('heart');

        // this.time.addEvent({
        //     delay: 20000,
        //     callback: function() {
        //         if(Math.random() <= 0.3){
        //             var buff = this.physics.add.staticSprite(this.game.config.width + 30, 125, 'heart_full').setOrigin(0, 1);
        //             buff.buff = function(player) {if(player.getLife() < 3){} player.state.life++; this.heart.play(); this.destroy();};
        //             this.buffs.add(buff);
        //         }
        //     },
        //     callbackScope: this,
        //     loop: true 
        // }),
        
        // this.purr = this.sound.add('purr');
        // this.meow = this.sound.add('meow');

        // this.time.addEvent({
        //     delay: 10000,
        //     callback: function() {
        //         if(!this.player.state.buffed && Math.random() <= 1){
        //             var buff = this.physics.add.staticSprite(this.game.config.width + 30, 125, 'caramelo').setOrigin(0, 1);
        //             buff.play('caramelo_wait');
        //             this.purr.play();

                    
        //             buff.buff = function(player) {
                        
                        
        //                 if(!player.state.buffed && !player.isDead() && !player.scene.state.game_over){
        //                     player.scene.meow.play();

        //                     this.setData('in_use', true);
        //                     this.disableBody();
        //                     this.setX(95);
        //                     this.play('caramelo_run');

        //                     player.hold();
        //                     player.setVelocity(0, 0);
        //                     player.setY(player.startY + 10);
        //                     player.state.buffed = true;
        //                     player.setTangeble(false);
        //                     player.disableBody();
        //                     player.scene.speedMultiplyer += 2,
        //                     player.scene.time.addEvent({
        //                         delay: 2500,
        //                         callback: function(){
        //                             this.setTangeble(true); this.state.buffed = false;
        //                             this.scene.speedMultiplyer -= 2;
        //                             this.play(this.animations.run.key);
        //                             this.setY(this.startY);
        //                             this.body.setSize(this.animations.run.width, this.animations.run.height);
        //                             this.enableBody();
        //                             this.sounds['step'].play();
        //                         },
        //                         callbackScope: player
        //                     });
        //                     player.scene.tweens.add({
        //                         targets: this,
        //                         delay: 2500,
        //                         duration: 500,
        //                         x: 300,
        //                         onComplete: function() {this.destroy()},
        //                         onCompleteScope: this
        //                     })
        //                 }
        //             };
        //             this.buffs.add(buff);
        //         }
        //     },
        //     callbackScope: this,
        //     loop: true 
        // })


        
        this.time.addEvent({
            delay: 20000,
            callback: function() {
                if(Math.random() <= .5)
                    this.meg.sounds['grunt'].play();
            },
            callbackScope: this,
            loop: true
        })
        
        
    }

    update(){
        //game on stand by
        if(Phaser.Input.Keyboard.JustDown(this.start_key) && this.state.game_over && !this.state.running && this.state.first_run) this.gameStart();

        if(this.state.running){
            for(let i = 0; i < this.obstacles.getChildren().length; i++){
                var obs = this.obstacles.getChildren()[i];
                obs.handleMovement(this.speedMultiplyer);
                if(obs.setOrigin(1, 1).x < 0){
                    obs.destroy();
                    let id = Math.floor(Math.random() * 2);
                    let x =( Math.floor(Math.random() * 150) + 400*(1 + this.acceleration));
                    obs = new obstacle(this, id, this.game.config.width + x, 125).setOrigin(0, 1);
                    this.obstacles.add(obs);
                };
            }

            //updating obstacles and backgorunds
            for(let i = 0; i < this.buffs.getChildren().length; i++){
                var buff = this.buffs.getChildren()[i];
                if(!buff.getData('in_use')){
                    buff.x -= this.speed * this.speedMultiplyer;
                    buff.refreshBody();
                }
                
                if(buff.setOrigin(1, 1).x < 0) buff.destroy();
            }
            
            
            this.ground.tilePositionX += this.speed * this.speedMultiplyer;

            for(let i = 0; i < this.parallax_backgrounds.length; i++){
                var background = this.parallax_backgrounds[i];
                background.tilePositionX += (this.speed * (1/background.getData('z_index'))) * this.speedMultiplyer;
            }



            //handling player movement and interactions
            this.player.handleMovement();
            this.score += 0.03 * this.speedMultiplyer;
            this.displayScore();

            //game variables
            this.speedMultiplyer += this.acceleration;
        }
        else if(Phaser.Input.Keyboard.JustDown(this.reset_key) && this.state.game_over) this.gameReset();
        
    }

    damagePlayer(){
        if(this.player.isTangeble() && !this.player.isDead()){
            this.player.damage();
            this.updateHearts();
             
            if(this.player.isDead()) this.gameOver();
            else
            this.tweens.add({
                targets: this.player,
                alpha: 0.5,
                ease: 'Linear',
                yoyo: true,
                duration: 1500/4,
                repeat: 1,
                onComplete: function(){this.player.setTangeble(true)},
                onCompleteScope: this
            });
        }
    }

    buffPlayer(player, buff){
        buff.buff(player);
        
        this.updateHearts();
    }

    updateHearts(){
        for(let i = 0; i < 3; i++) this.hearts[i].destroy();
        var full = this.player.getLife();
        for(let i = 0; i < 3; i++, full--){
            if(full > 0) this.hearts[i] = this.add.image(10 + i*12, 10, 'heart_full');
            else this.hearts[i] = this.add.image(10 + i*12, 10, 'heart_empty');
        }
    }

    displayScore(){
        this.scoreDisplay.setText(this.score.toFixed(0).toString() + ' m');
    }

    gameOver(){
        this.state.first_run = false;
        this.background_music.setVolume(0.01);
        this.state.running = false;
        this.state.game_over = true;
        this.meg.stop();
        console.log('Game Over');
        
    }

    gameStart(){
        this.background_music.setVolume(0.05);
        this.state.game_over = false;
        console.log('Game Start');
        this.meg.start();
        this.time.addEvent({
            delay: 1250,
            callback: function() {
                this.player.setVisible(true);
                this.state.running = true;
                this.player.getSound('step').play();
                this.tweens.add({
                    targets: [this.player, this.meg],
                    x: '+=50',
                    ease: 'Linear',
                    duration: 60,
                    repeat: 0,
                    useFrames: true,
                    completeDelay: 15,
                    onComplete: function() {
                        
                    },
                    onCompleteScope: this
                });
            },
            callbackScope: this
        })
        
    }

    gameReset(){
        //reseting the position of the game objects
        this.state.game_over = false;
        this.speedMultiplyer = 1;
        this.score = 0;
        this.hearts = [this.add.image(10, 10, 'heart_full'), this.add.image(22, 10, 'heart_full'),this.add.image(34, 10, 'heart_full')];

        this.player.setVisible(false);
        this.player.reset();
        this.player.enableBody();
        this.player.setPosition(-10, 125);

        this.meg.reset();
        this.meg.setX(60);
        this.obstacles.clear(true, true);
        this.obstacles.add(new obstacle(this, Math.floor(Math.random() * 2), this.game.config.width + 100, 125).setOrigin(0, 1));
        this.gameStart()

    }
}