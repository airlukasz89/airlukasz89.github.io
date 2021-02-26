import 'phaser';

export default class Bullet extends Phaser.GameObjects.Image {
    speed: number;

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, 'bullet');
        this.speed = Phaser.Math.GetSpeed(900, 1);
    }

    fire(x: number, y: number) {
        this.setPosition(x + 120, y);

        this.setActive(true);
        this.setVisible(true);
    }

    update(time: number, delta: number) {
        this.x += this.speed * delta;

        if (this.x > 1366) {
            this.setActive(false);
            this.setVisible(false);
        }
    }

}
