import 'phaser';

export default class Demo extends Phaser.Scene {
    constructor() {
        super('demo');
    }

    ship: Phaser.GameObjects.Image;
    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    preload() {
        this.load.image('bg', 'assets/libs.png');
        this.load.image('ground', 'assets/phaser3-logo.png');
        this.load.image('ship', 'assets/ship.png');
    }

    update() {
        let diff = 10;
        if (this.cursors.left.isDown) {
            this.ship.x -= diff;

            this.player.setVelocityX(-40)
        }
        else if (this.cursors.right.isDown) {
            this.ship.x += diff;

            this.player.setVelocityX(40)
        }

        if (this.cursors.up.isDown) {
            this.ship.y -= diff;

            this.player.setVelocityY(-50)
        }
        else if (this.cursors.down.isDown) {
            this.ship.y += diff;
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

        this.ship = this.add.image(100, 100, 'ship')
        this.ship.setScale(0.3, 0.3);

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