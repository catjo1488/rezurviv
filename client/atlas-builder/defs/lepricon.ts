import type { AtlasDef } from "../atlasDefs";
import { BuildingSprites } from "./buildings";

export const lepriconAtlas: AtlasDef = {
    compress: true,
    images: [
        ...BuildingSprites.bunker_crossing,
        ...BuildingSprites.bunker_hydra,
        ...BuildingSprites.bunker_twins,
        ...BuildingSprites.bunker_eye,
        ...BuildingSprites.bunker_hatchet,
        "map/map-airdrop-03.svg",
        "map/map-airdrop-04.svg",
        "map/map-building-bridge-xlg-floor.svg",
        "map/map-bush-01x.svg",
        "map/map-bush-06.svg",
        "map/map-complex-warehouse-floor-04.svg",
        "map/map-chest-03x.svg",

        "map/map-crate-01x.svg",
        "map/map-crate-02x.svg",
        "map/map-crate-03x.svg",

        "map/map-stone-01x.svg",
        "map/map-stone-03x.svg",
        "map/map-stone-res-01x.svg",
        "map/map-stone-res-02x.svg",

        "map/map-table-01x.svg",
        "map/map-table-02x.svg",
        "map/map-table-03x.svg",

        "map/map-tree-01.svg",
        "map/map-tree-02.svg",
        "map/map-tree-03.svg",
        "map/map-tree-05.svg",
        "map/map-tree-07.svg",
        "map/map-tree-08.svg",
        "map/map-tree-09.svg",
        "map/map-tree-10.svg",
        "map/map-tree-11.svg",

        "map/map-woodpile-02.svg",
        "map/map-woodpile-res-02.svg",
        "map/map-crate-02f.svg",

        "map/map-crate-12.svg",
        "map/map-crate-13.svg",
        "map/map-crate-22.svg",

        "map/map-statue-01.svg",
        "map/map-statue-top-01.svg",
        "map/map-statue-top-02.svg",

        "map/map-bush-01f.svg",
        "map/map-tree-08f.svg",

        "map/map-stone-03f.svg",
        "map/map-stone-res-02f.svg",
    ],
};