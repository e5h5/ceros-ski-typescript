import {IMAGE_NAMES} from '../../../Constants';
import {Skier} from '../../Skier';
import {Obstacle} from '../Obstacle';

export class JumpRamp extends Obstacle {
    imageName = IMAGE_NAMES.JUMP_RAMP;

    collide(skier: Skier): void {
        if (!skier.isJumping()) {
            skier.jump();
        }
    };
}