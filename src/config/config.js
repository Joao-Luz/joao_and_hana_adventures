import menu from '../scenes/menu'
import cutscene from '../scenes/cutscene'
import selectMenu from '../scenes/selectMenu'
import game from '../scenes/game'
import loading from '../scenes/loading'

export default {
    type: Phaser.AUTO,
    parent: "hana-and-joao-adventure",
    width: 200,
    height: 150,
    render: {
      pixelArt: true,

    },
    scene: [loading, game, selectMenu, menu, cutscene],
    
    scale: {
      zoom: 4
    },
    physics: {
      default: "arcade",
      arcade:{
          gravity: {y: 980},
          debug: false
      }
    }
  };