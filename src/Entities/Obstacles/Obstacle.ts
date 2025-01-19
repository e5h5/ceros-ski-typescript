/**
 * An obstacle that appears on the mountain. Randomly created as one of the types defined in the OBSTACLE_TYPES array.
 */

import { IMAGE_NAMES } from "../../Constants";
import { Entity } from "../Entity";
import {Skier} from '../Skier';

/**
 * The different types of obstacles that can be placed in the game.
 */
const OBSTACLE_TYPES: IMAGE_NAMES[] = [
    IMAGE_NAMES.TREE,
    IMAGE_NAMES.TREE_CLUSTER,
    IMAGE_NAMES.ROCK1,
    IMAGE_NAMES.ROCK2,
];

export abstract class Obstacle extends Entity {
    /**
     * The name of the current image being displayed for the obstacle.
     */
    abstract imageName: IMAGE_NAMES;
    abstract collide(skier: Skier): void;

    /**
     * Obstacles can't be destroyed
     */
    die() {}
}
