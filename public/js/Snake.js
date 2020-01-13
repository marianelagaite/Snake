export default class Snake {
    constructor(scene) {
        this.scene = scene;
        this.lastMoveTime = 0;
        this.moveInterval = 100; //miliseconds
        this.tilesize = 16;
        this.direction = Phaser.Math.Vector2.RIGHT;
        this.body = [];
        this.body.push(this.scene.add.rectangle(this.scene.game.config.width / 2, this.scene.game.config.height / 2, this.tilesize, this.tilesize, 0xff0000).setOrigin(0));
        this.apple = this.scene.add.rectangle(0,0,this.tilesize,this.tilesize,0x00ff00).setOrigin(0); 
        this.positionApple();
        scene.input.keyboard.on('keydown', e => {
            this.keydown(e);
        })
    }

    positionApple(){
        this.apple.x = Math.floor(Math.random() * this.scene.game.config.width / this.tilesize) * this.tilesize;
        this.apple.y = Math.floor(Math.random() * this.scene.game.config.height / this.tilesize) * this.tilesize;
    }

    keydown(event) {
        switch (event.keyCode) {
            case 37: //left
            case 65: //A
                this.direction = Phaser.Math.Vector2.LEFT;
                break;
            case 38: //up
            case 87: //W
                this.direction = Phaser.Math.Vector2.UP;
                break;
            case 39: //right
            case 68: //D
                this.direction = Phaser.Math.Vector2.RIGHT;
                break;
            case 40: //down
            case 83: //S
                this.direction = Phaser.Math.Vector2.DOWN;
                break;
        }
    }

    update(time) {
        if(time >= this.lastMoveTime + this.moveInterval){
            this.lastMoveTime = time;
            this.move();
        }
    }

    move(){
        let x = this.body[0].x + this.direction.x * this.tilesize;
        let y = this.body[0].y + this.direction.y * this.tilesize;
        
        if(this.apple.x === x && this.apple.y === y){ //eaten the apple
            this.body.push(this.scene.add.rectangle(0,0,this.tilesize,this.tilesize,0xffffff).setOrigin(0));
            this.positionApple();
        }

        
        for(let index = this.body.length - 1; index > 0; index--){
            this.body[index].x = this.body[index -1].x;
            this.body[index].y = this.body[index -1].y;
        }
        this.body[0].x = x;
        this.body[0].y = y;
    }
} 