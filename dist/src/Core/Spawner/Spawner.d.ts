import { Gem, ILevel } from '../Board/BoardTypes';
import { IRawSpawn } from '../LevelParser/LevelParserTypes';
import { Cell } from '../Types';
import { ISpawner, SpawnerProps } from './SpawnerTypes';
export declare class Spawner implements ISpawner {
    private board;
    private commonSpawns;
    private initialGemColors;
    init(props: SpawnerProps): void;
    loadLevel(level: ILevel): void;
    private getInitialGemColors;
    spawn(cell: Cell): Gem;
    private trySpawnFromPredefined;
    private getBootItem;
    private trySpawnFromBoot;
    private trySpawnFromCommonSpawns;
    private trySpawnFromInitialGemColors;
    private trySpawnFromFallbackGemColors;
    findActiveSpawn(spawns: IRawSpawn[]): IRawSpawn | null;
    private isSpawnConditionValid;
    private trySpawn;
    private tryPickSpawnVariant;
    private pickRandomVariant;
    cloneCommonSpawns(): IRawSpawn[];
    clone(): ISpawner;
}
