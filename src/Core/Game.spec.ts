import {ObstacleManager} from '../Entities/Obstacles/ObstacleManager';
import {Rhino} from '../Entities/Rhino';
import {Skier} from '../Entities/Skier';
import {Game} from './Game';

jest.mock("./Canvas");
jest.mock("../Entities/Obstacles/ObstacleManager");
jest.mock("../Entities/Skier");
jest.mock("../Entities/Rhino");

describe("Skier", () => {
    let game: Game;

    beforeEach(() => {
        jest.spyOn(Game.prototype, 'calculateGameWindow').mockImplementation(() => {});

        game = new Game();
    });

    test("should reset when pressing R when skier is dead", () => {
        jest.spyOn(Skier.prototype, 'isDead').mockReturnValue(false);

        game.initialiseGame = jest.fn();

        const event = new KeyboardEvent('keydown', { key: 'r' });

        game.handleKeyDown(event);

        expect(game.initialiseGame).toHaveBeenCalledTimes(0);

        jest.spyOn(Skier.prototype, 'isDead').mockReturnValue(true);

        game.handleKeyDown(event);

        expect(game.initialiseGame).toHaveBeenCalledTimes(1);
    });

    test("should pause when pressing P", () => {
        game.togglePause = jest.fn();

        const event = new KeyboardEvent('keydown', { key: 'p' });

        game.handleKeyDown(event);

        expect(game.togglePause).toHaveBeenCalledTimes(1);
    });

    test("should not update difficulty, obstacles, skier, or rhino when paused", () => {
        jest.spyOn(Skier.prototype, 'update').mockImplementation(() => {});
        jest.spyOn(Rhino.prototype, 'update').mockImplementation(() => {});
        jest.spyOn(ObstacleManager.prototype, 'placeNewObstacle').mockImplementation(() => {});

        game.updateDifficulty = jest.fn();

        game.updateGameWindow();

        expect(Skier.prototype.update).toHaveBeenCalledTimes(1);
        expect(Rhino.prototype.update).toHaveBeenCalledTimes(1);
        expect(ObstacleManager.prototype.placeNewObstacle).toHaveBeenCalledTimes(1);
        expect(game.updateDifficulty).toHaveBeenCalledTimes(1);

        jest.resetAllMocks();

        game.togglePause();
        game.updateGameWindow()

        expect(Skier.prototype.update).toHaveBeenCalledTimes(0);
        expect(Rhino.prototype.update).toHaveBeenCalledTimes(0);
        expect(ObstacleManager.prototype.placeNewObstacle).toHaveBeenCalledTimes(0);
        expect(game.updateDifficulty).toHaveBeenCalledTimes(0);
    });
});