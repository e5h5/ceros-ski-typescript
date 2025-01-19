import {IMAGE_NAMES} from '../../../Constants';
import {Skier} from '../../Skier';
import {Obstacle} from '../Obstacle';

export class Rock2 extends Obstacle {
    imageName = IMAGE_NAMES.ROCK2;

    collide(skier: Skier): void {
        if (!skier.isJumping()) {
            skier.crash();
        }
    };
}