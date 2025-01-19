import {IMAGE_NAMES} from '../../../Constants';
import {Skier} from '../../Skier';
import {Obstacle} from '../Obstacle';

export class Tree extends Obstacle {
    imageName: IMAGE_NAMES = IMAGE_NAMES.TREE;

    collide(skier: Skier): void {
        skier.crash();
    };
}