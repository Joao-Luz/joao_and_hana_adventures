import 'phaser'

//sounds
import background_music from '../assets/sounds/Funky_Love_Disco_Pump.ogg'
import step from '../assets/sounds/step.ogg'
import jump from '../assets/sounds/jump.ogg'
import slide from '../assets/sounds/slide.ogg'
import hit from '../assets/sounds/hit.ogg'
import bark from '../assets/sounds/bark.ogg'
import grunt from '../assets/sounds/grunt.ogg'
import meow from '../assets/sounds/meow.ogg'
import purr from '../assets/sounds/purr.ogg'
import swarm from '../assets/sounds/swarm.ogg'
import heart from '../assets/sounds/heart.ogg'
import ants_sound from '../assets/sounds/ants.ogg'

//sprites
import joao from '../assets/sprites/joao.png'
import joao_model from '../assets/sprites/joao_model.png'
import hana from '../assets/sprites/hana.png'
import hana_model from '../assets/sprites/hana_model.png'
import meg from '../assets/sprites/meg.png'
import caramelo from '../assets/sprites/caramelo.png'
import ground from '../assets/sprites/ground.png'
import ants from '../assets/sprites/ants.png'
import moths from '../assets/sprites/moths.png'
import heart_empty from '../assets/sprites/heart_empty.png'
import heart_full from '../assets/sprites/heart_full.png'
import background from '../assets/sprites/background.png'
import foreground from '../assets/sprites/foreground.png'
import buildings from '../assets/sprites/foreground1.png'

//fonts
import AGoblinAppearsPNG from '../assets/fonts/AGoblinAppears.png'
import AGoblinAppearsXML from '../assets/fonts/AGoblinAppears.xml'


export default class loading extends Phaser.Scene{
    constructor(){
        super('loading');
    }

    preload(){
        this.load.audio('background_music', background_music);
        this.load.audio('step', step);
        this.load.audio('jump', jump);
        this.load.audio('slide', slide);
        this.load.audio('hit', hit);
        this.load.audio('bark', bark);
        this.load.audio('grunt', grunt);
        this.load.audio('meow', meow);
        this.load.audio('purr', purr);
        this.load.audio('swarm', swarm);
        this.load.audio('heart', heart);
        this.load.audio('ants', ants_sound);

        this.load.image('joao_model', joao_model);
        this.load.image('hana_model', hana_model);
        this.load.image('ground', ground);
        this.load.image('heart_empty', heart_empty);
        this.load.image('heart_full', heart_full);
        this.load.image('background', background);
        this.load.image('foreground', foreground);
        this.load.image('buildings', buildings);

        this.load.spritesheet("joao", joao, {
            frameWidth: 58,
            frameHeight: 58
        });
        
        this.load.spritesheet("hana", hana, {
            frameWidth: 54,
            frameHeight: 54
        });

        this.load.spritesheet("meg", meg, {
            frameWidth: 32,
            frameHeight: 19
        });
        this.load.spritesheet("caramelo", caramelo, {
            frameWidth: 31,
            frameHeight: 19
        });

        this.load.spritesheet("moths", moths, {
            frameWidth: 48,
            frameHeight: 32
        });
        this.load.spritesheet("ants", ants, {
            frameWidth: 27,
            frameHeight: 12
        });

        this.load.bitmapFont('AGoblinAppears', AGoblinAppearsPNG, AGoblinAppearsXML);
    }

    create(){
        this.add.text(100, 100, 'Loading');

        this.anims.create({
            key: 'joao_run',
            frames: this.anims.generateFrameNumbers('joao', {
                start: 0,
                end: 7
            }),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: 'joao_slide',
            frames: this.anims.generateFrameNumbers('joao', {
                start: 8,
                end: 12
            }),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: 'joao_jump',
            frames: this.anims.generateFrameNumbers('joao', {
                start: 13,
                end: 17
            }),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: 'joao_fall',
            frames: this.anims.generateFrameNumbers('joao', {
                start: 18,
                end: 21
            }),
            frameRate: 12,
            repeat: 0,
        });
        this.anims.create({
            key: 'joao_hold',
            frames: this.anims.generateFrameNumbers('joao', {
                start: 22,
                end: 25
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: 'hana_run',
            frames: this.anims.generateFrameNumbers('hana', {
                start: 0,
                end: 7
            }),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: 'hana_slide',
            frames: this.anims.generateFrameNumbers('hana', {
                start: 8,
                end: 12
            }),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: 'hana_jump',
            frames: this.anims.generateFrameNumbers('hana', {
                start: 13,
                end: 17
            }),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: 'hana_fall',
            frames: this.anims.generateFrameNumbers('hana', {
                start: 18,
                end: 21
            }),
            frameRate: 12,
            repeat: 0,
        });

        this.anims.create({
            key: 'meg_wait',
            frames: this.anims.generateFrameNumbers('meg', {
                start: 0,
                end: 7
            }),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: 'meg_bark',
            frames: this.anims.generateFrameNumbers('meg', {
                start: 8,
                end: 22
            }),
            frameRate: 12,
            repeat: 0,
        });
        this.anims.create({
            key: 'meg_run',
            frames: this.anims.generateFrameNumbers('meg', {
                start: 23,
                end: 26
            }),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: 'meg_stop',
            frames: this.anims.generateFrameNumbers('meg', {
                start: 27,
                end: 28
            }),
            frameRate: 12,
            repeat: 0,
        });

        this.anims.create({
            key: 'caramelo_run',
            frames: this.anims.generateFrameNumbers('caramelo', {
                start: 0,
                end: 3
            }),
            frameRate: 12,
            repeat: -1 ,
        });
        this.anims.create({
            key: 'caramelo_wait',
            frames: this.anims.generateFrameNumbers('caramelo', {
                start: 4,
                end: -1
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: 'moths_anim',
            frames: this.anims.generateFrameNumbers('moths', {
                start: 0,
                end: 4
            }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'ants_anim',
            frames: this.anims.generateFrameNumbers('ants'),
            frameRate: 12,
            repeat: -1
        });

        this.scene.start('menu');
    }
}