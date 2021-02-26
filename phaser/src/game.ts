import 'phaser';
import Bullet from "./Bullet";

export default class Demo extends Phaser.Scene {
    constructor() {
        super('demo');
    }

    ship: Phaser.GameObjects.Sprite;
    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    bullets: Phaser.GameObjects.Group;
    speed: number;
    lastFired: number = 0;

    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    preload() {
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('bg', 'assets/libs.png');
        this.load.image('ground', 'assets/phaser3-logo.png');
        this.load.spritesheet('ship', 'assets/ezgif.com-gif-maker.png', { frameWidth: 176, frameHeight: 96 });
    }

    update(time: number, delta: number) {
        let diff = 20;
        if (this.cursors.left.isDown) {
            this.ship.x -= diff;

            this.player.setVelocityX(-200)
        }
        else if (this.cursors.right.isDown) {
            this.ship.x += diff;

            this.player.setVelocityX(200)
        }

        if (this.cursors.up.isDown) {
            this.ship.y -= diff;

            this.player.setVelocityY(-200)
        }
        else if (this.cursors.down.isDown) {
            this.ship.y += diff;
        }





        if (this.cursors.space.isDown && time > this.lastFired) {
            var bullet = this.bullets.get();

            if (bullet) {
                bullet.fire(this.ship.x, this.ship.y);

                this.lastFired = time + 50;
            }
        }
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys()

        var windowWidth = window.innerWidth;
        var widnowHeight = window.innerHeight;
        var bg = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bg');

        // bg.setDisplaySize(windowWidth, widnowHeight);
        let scaleX = this.cameras.main.width / bg.width
        let scaleY = this.cameras.main.height / bg.height
        let scale = Math.max(scaleX, scaleY)
        bg.setScale(scale).setScrollFactor(0)

        // this.ship = this.add.image(100, 100, 'ship')
        // this.ship.setScale(0.3, 0.3);






        this.bullets = this.add.group({
            classType: Bullet,
            maxSize: 50,
            runChildUpdate: true
        });

        this.bullets.createMultiple({ quantity: 20, active: false });

        // ship = this.add.sprite(400, 500, 'ship').setDepth(1);

        this.speed = Phaser.Math.GetSpeed(300, 1)





        const shipAnimation = this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('ship', null),
            frameRate: 16
        });

        this.ship = this.add.sprite(150, 450, 'ship');

        this.ship.play({ key: 'fly', repeat: -1 });

        this.ship.setScale(1.5, 1.5);



        const platforms = this.createPlatforms();
        this.createPlayer();
        this.physics.add.collider(this.player, platforms)

        this.scale.displaySize.setAspectRatio(windowWidth / widnowHeight);
        this.scale.refresh();
    }

    createPlayer() {
        this.player = this.physics.add.sprite(300, 450, 'ship')
        this.player.setScale(0.3, 0.3);
        this.player.refreshBody();
        this.player.setBounce(0.2)
        this.player.setCollideWorldBounds(true)
    }

    createPlatforms() {
        const platforms = this.physics.add.staticGroup()

        // platforms.create(400, 568, 'ground').setScale(2).refreshBody()

        //  platforms.create(600, 500, 'ground')
        platforms.create(200, 600, 'ground')
        //platforms.create(750, 500, 'ground')

        return platforms;
    }
}


const config = {
    width: 1280,
    height: 720,
    // Sets game scaling
    scale: {
        // Fit to window
        mode: Phaser.Scale.FIT,
        // Center vertically and horizontally
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 200 }
        }
    },
    backgroundColor: '#125555',
    // width: DEFAULT_WIDTH,
    // height: 600,
    scene: Demo
};



const game = new Phaser.Game(config);