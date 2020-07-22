import 'phaser'

export var onAnimationcomplete = function(anim) {
    console.log("animationcomplete", anim.key);
    
    var next = anims.shift();

    if (next) {
      this.play(next);
    } else {
      this.off("animationcomplete", onAnimationcomplete);
    }
  };