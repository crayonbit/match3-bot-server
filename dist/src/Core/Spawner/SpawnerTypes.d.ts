import type { Gem, IBoard, ILevel } from '../Board/BoardTypes';
import type { IRawSpawn } from '../LevelParser/LevelParserTypes';
import type { Cell } from '../Types';
export type SpawnerProps = {
    board: Pick<IBoard, 'grid' | 'spawnGem' | 'randomGenerator' | 'gemsLayer' | 'progressManager' | 'logger'>;
};
export interface ISpawner {
    init(props: SpawnerProps): void;
    loadLevel(level: ILevel): void;
    spawn(cell: Cell): Gem;
    cloneCommonSpawns(): IRawSpawn[];
    clone(): ISpawner;
}
