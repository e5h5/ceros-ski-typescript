import {IMAGE_NAMES} from '../../../Constants';
import {Skier} from '../../Skier';
import {Obstacle} from '../Obstacle';

export class Rock1 extends Obstacle {
    imageName = IMAGE_NAMES.ROCK1;

    collide(skier: Skier): void {
        if (!skier.isJumping()) {
            skier.crash();
        }
    };
}