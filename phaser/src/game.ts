import 'phaser';

export default class Demo extends Phaser.Scene {
    constructor() {
        super('demo');
    }

    ship: Phaser.GameObjects.Image;
    x: number = 100;

    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    preload() {
        this.load.image('logo', 'assets/libs.png');
        this.load.image('ship', 'assets/ship.png');
    }

    update() {
        // this.x += 1;
        // this.ship.x++;
        // this.ship.y++;
        let diff = 10;
        if (this.cursors.left.isDown) {
            this.ship.x -= diff;
        }
        else if (this.cursors.right.isDown) {
            this.ship.x += diff;
        }

        if (this.cursors.up.isDown) {
            this.ship.y -= diff;
        }
        else if (this.cursors.down.isDown) {
            this.ship.y += diff;
        }
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys()

        var windowWidth = window.innerWidth;
        var widnowHeight = window.innerHeight;
        var bg = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'logo');
        // bg.setDisplaySize(windowWidth, widnowHeight);
        let scaleX = this.cameras.main.width / bg.width
        let scaleY = this.cameras.main.height / bg.height
        let scale = Math.max(scaleX, scaleY)
        bg.setScale(scale).setScrollFactor(0)


        this.ship = this.add.image(100, 100, 'ship')
        this.ship.setScale(0.3, 0.3);

        this.scale.displaySize.setAspectRatio(windowWidth / widnowHeight);
        this.scale.refresh();
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
    backgroundColor: '#125555',
    // width: DEFAULT_WIDTH,
    // height: 600,
    scene: Demo
};

const game = new Phaser.Game(config);
