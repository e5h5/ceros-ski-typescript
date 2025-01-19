import {IMAGE_NAMES} from '../../../Constants';
import {Skier} from '../../Skier';
import {Obstacle} from '../Obstacle';

export class TreeCluster extends Obstacle {
    imageName: IMAGE_NAMES = IMAGE_NAMES.TREE_CLUSTER;

    collide(skier: Skier): void {
        skier.crash();
    };
}