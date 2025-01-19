import { Skier } from "./Skier";
import { Canvas } from "../Core/Canvas";
import { ImageManager } from "../Core/ImageManager";
import { ObstacleManager } from "./Obstacles/ObstacleManager";
import { KEYS } from "../Constants";
import {JumpRamp} from './Obstacles/ObstacleVariants/JumpRamp';
import {Rock1} from './Obstacles/ObstacleVariants/Rock1';
import {Rock2} from './Obstacles/ObstacleVariants/Rock2';
import {Tree} from './Obstacles/ObstacleVariants/Tree';
import {TreeCluster} from './Obstacles/ObstacleVariants/TreeCluster';

jest.mock("../Core/Canvas");
jest.mock("../Core/ImageManager");
jest.mock("./Obstacles/ObstacleManager");

describe("Skier", () => {
    let skier: Skier;
    let canvas: Canvas;
    let imageManager: ImageManager;
    let obstacleManager: ObstacleManager;

    beforeEach(() => {
        canvas = new (Canvas as jest.Mock<Canvas>)();
        imageManager = new (ImageManager as jest.Mock<ImageManager>)();
        obstacleManager = new (ObstacleManager as jest.Mock<ObstacleManager>)();
        skier = new Skier(0, 0, imageManager, obstacleManager, canvas);
    });

    test("should jump when encountering a ramp", () => {
        const ramp = new JumpRamp(0, 0, imageManager, canvas);
        skier.jump = jest.fn();
        skier.getCollidingObstacles = jest.fn().mockReturnValue([ramp]);

        skier.checkIfHitObstacle();

        expect(skier.jump).toHaveBeenCalledTimes(1);
    });

    test("should jump when hitting the spacebar", () => {
        const ramp = new JumpRamp(0, 0, imageManager, canvas);
        skier.jump = jest.fn();

        skier.handleInput(KEYS.SPACEBAR);

        expect(skier.jump).toHaveBeenCalledTimes(1);
    });

    test("should not crash when jumping over rocks", () => {
        const rock1 = new Rock1(0, 0, imageManager, canvas);
        const rock2 = new Rock2(0, 0, imageManager, canvas);

        skier.jump();

        skier.crash = jest.fn();
        skier.getCollidingObstacles = jest.fn().mockReturnValue([rock1, rock2]);

        skier.checkIfHitObstacle();

        expect(skier.crash).toBeCalledTimes(0);

        skier.landJump();

        skier.checkIfHitObstacle()

        expect(skier.crash).toBeCalledTimes(2);
    });

    test("should crash into trees, even if jumping", () => {
        const tree = new Tree(0, 0, imageManager, canvas);
        const treeCluster = new TreeCluster(0, 0, imageManager, canvas);

        skier.jump();

        skier.crash = jest.fn();
        skier.getCollidingObstacles = jest.fn().mockReturnValue([tree, treeCluster]);

        skier.checkIfHitObstacle();

        expect(skier.crash).toBeCalledTimes(2);

        skier.landJump();

        skier.checkIfHitObstacle()

        expect(skier.crash).toBeCalledTimes(4);
    });

    test("should not change direction while jumping", () => {
        skier.turnLeft = jest.fn();
        skier.turnRight = jest.fn();
        skier.jump();

        skier.handleInput(KEYS.LEFT);
        skier.handleInput(KEYS.RIGHT);

        expect(skier.turnLeft).toBeCalledTimes(0);
        expect(skier.turnRight).toBeCalledTimes(0);
    });
});