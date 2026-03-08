import { GameConfig } from "../../gameConfig";
import { util } from "../../utils/util";
import { v2 } from "../../utils/v2";
import type { MapDef } from "../mapDefs";
import { MapId } from "../types/misc";
import { Main, type PartialMapDef } from "./baseDefs";


const mapDef: PartialMapDef = {
    mapId: MapId.OneVFifty,
    desc: {
        name: "1v50",
        icon: "img/gui/star.svg",
        buttonCss: "btn-mode-faction",
        buttonText: "1v50",
        backgroundImg: "img/main_splash_0_7_3.png",
    },
    assets: {
        audio: [
            { name: "lt_assigned_01", channel: "ui" },
            { name: "captain_assigned_01", channel: "ui" },
        ],
 atlases: ["gradient", "loadout", "shared", "halloween", "main", "oneVFifty"],
    },
biome: {
    colors: {
        background: 0x170000,
        water: 0x280000,
        waterRipple: 0x100101,
        beach: 0x64410e,
        riverbank: 0x3c1b05,
        grass: 0x212404,
        underground: 0x120801,
        playerSubmerge: 0x140000,
        playerGhillie: 0x212404,
    },
    valueAdjust: 0.3,
    sound: { riverShore: "sand" },
    particles: { camera: "falling_leaf_halloween" },
    tracerColors: {},
    airdrop: {
        planeImg: "map-plane-01.img",
        planeSound: "plane_01",
        airdropImg: "map-chute-01.img",
    },
},
gameMode: {
    maxPlayers: 51,
    factionMode: true,
    factions: 1,        // одна команда — все союзники
    killLeaderEnabled: false,
},
    /* STRIP_FROM_PROD_CLIENT:START */
    gameConfig: {
        planes: {
            timings: [
                {
                    circleIdx: 2,
                    wait: 6,
                    options: { type: GameConfig.Plane.Airdrop },
                },
                {
                    circleIdx: 4,
                    wait: 3,
                    options: { type: GameConfig.Plane.Airdrop },
                },
            ],
            crates: [{ name: "airdrop_crate_03", weight: 1 }],
        },
        roles: {
            timings: [
                { role: "deserter_1", circleIdx: 0, wait: 50  },
                { role: "deserter_2", circleIdx: 0, wait: 100 },
                { role: "deserter_3", circleIdx: 0, wait: 150 },
                { role: "deserter_4", circleIdx: 0, wait: 200 },
                { role: "deserter_5", circleIdx: 0, wait: 300 },
            ],
        },
        bagSizes: {},
        bleedDamage: 2,
        bleedDamageMult: 1.25,
    },
    lootTable: {
        tier_guns: [
            { name: "ak47",   count: 1, weight: 8   },
            { name: "hk416",  count: 1, weight: 6   },
            { name: "mp5",    count: 1, weight: 10  },
            { name: "m870",   count: 1, weight: 9   },
            { name: "m9",     count: 1, weight: 14  },
            { name: "glock",  count: 1, weight: 7   },
            { name: "ump9",   count: 1, weight: 5   },
            { name: "mac10",  count: 1, weight: 5   },
            { name: "m1100",  count: 1, weight: 4   },
            { name: "mosin",  count: 1, weight: 2   },
            { name: "m39",    count: 1, weight: 1   },
            { name: "dp28",   count: 1, weight: 1   },
            { name: "famas",  count: 1, weight: 2   },
            { name: "saiga",  count: 1, weight: 0.5 },
            { name: "deagle", count: 1, weight: 0.3, preload: true },
        ],
        tier_medical: [
            { name: "bandage",    count: 5, weight: 16 },
            { name: "healthkit",  count: 1, weight: 4  },
            { name: "soda",       count: 1, weight: 15 },
            { name: "painkiller", count: 1, weight: 5  },
        ],
        tier_world: [
            { name: "tier_guns",    count: 1, weight: 0.4  },
            { name: "tier_scopes",  count: 1, weight: 0.15 },
            { name: "tier_armor",   count: 1, weight: 0.15 },
            { name: "tier_medical", count: 1, weight: 0.15 },
            { name: "tier_packs",   count: 1, weight: 0.2  },
        ],
        tier_scopes: [
            { name: "2xscope",  count: 1, weight: 20  },
            { name: "4xscope",  count: 1, weight: 8   },
            { name: "8xscope",  count: 1, weight: 2   },
            { name: "15xscope", count: 1, weight: 0.5 },
        ],
        tier_armor: [
            { name: "helmet01", count: 1, weight: 12 },
            { name: "helmet02", count: 1, weight: 6  },
            { name: "helmet03", count: 1, weight: 1  },
            { name: "chest01",  count: 1, weight: 15 },
            { name: "chest02",  count: 1, weight: 6  },
            { name: "chest03",  count: 1, weight: 1  },
        ],
        tier_packs: [
            { name: "backpack01", count: 1, weight: 15 },
            { name: "backpack02", count: 1, weight: 7  },
            { name: "backpack03", count: 1, weight: 1  },
        ],
        tier_airdrop_uncommon: [
            { name: "mk12",   count: 1, weight: 2.5  },
            { name: "scar",   count: 1, weight: 0.75 },
            { name: "m249",   count: 1, weight: 0.3  },
            { name: "pkp",    count: 1, weight: 0.1  },
            { name: "sv98",   count: 1, weight: 1    },
            { name: "vector", count: 1, weight: 1    },
            { name: "deagle", count: 1, weight: 1    },
        ],
    },
    mapGen: {
        map: {
            scale: { small: 1.1875, large: 1.1875 },
            rivers: {
                weights: [
                    { weight: 0.1, widths: [4] },
                    { weight: 0.15, widths: [8] },
                    { weight: 0.25, widths: [8, 4] },
                    { weight: 0.21, widths: [8] },
                    { weight: 0.09, widths: [8, 8] },
                    { weight: 0.2, widths: [8, 8, 4] },
                    {
                        weight: 1e-4,
                        widths: [8, 8, 8, 6, 4],
                    },
                ],
            },
        },
        places: [
            { name: "The Arena",   pos: v2.create(0.5,  0.5)  },
            { name: "Red Base",    pos: v2.create(0.15, 0.5)  },
            { name: "Blue Base",   pos: v2.create(0.85, 0.5)  },
            { name: "The Market",  pos: v2.create(0.5,  0.2)  },
            { name: "Old Factory", pos: v2.create(0.5,  0.8)  },
            { name: "North Woods", pos: v2.create(0.3,  0.85) },
            { name: "South Ridge", pos: v2.create(0.7,  0.15) },
        ],
        bridgeTypes: {
            medium: "bridge_md_structure_01",
            large:  "bridge_lg_structure_01",
            xlarge: "bridge_xlg_structure_01",
        },
        customSpawnRules: {
            locationSpawns: [],
            placeSpawns: [],
        },
        densitySpawns: [
            {
                tree_01:     500,
                tree_02:     300,
                tree_07:     250,
                tree_08:     200,
                tree_09:     100,
                crate_01:    300,
                crate_02:    120,
                crate_03:     40,
                barrel_01:   120,
                stone_01:    180,
                bush_01:     200,
                loot_tier_1: 160,
                loot_tier_beach: 20,
                container_01:  8,
                container_02:  8,
                container_03:  8,
                container_04:  8,
                shack_01:     12,
                outhouse_01:   8,
                silo_01:      10,
            },
        ],
fixedSpawns: [
    {
        warehouse_01:         4,
        house_red_01:        10,
        house_red_02:        10,
        barn_01:             10,
        bank_01:             2,
        police_01:           4,
        hut_01:              10,
        hut_02:              10,
        shack_03a:           10,
        shack_03b:           10,
        greenhouse_01:       10,
        bunker_structure_01: { odds: 1 },
        bunker_structure_02: 10,
        bunker_structure_03: 10,
        cache_01:            10,
        cache_02:            10,
        cache_07:            10,
        chest_01:            10,
        mil_crate_02:        { odds: 1 },
        tree_07:             700,  // хеллоуин деревья для атмосферы
        tree_08:             200,
        tree_09:             36,
    },
],
spawnReplacements: [
    {
        tree_01: "tree_07",   // обычные деревья → хеллоуин
        stone_03: "stone_01",
    },
],
        importantSpawns: [
            "bank_01",
            "police_01",
            "tree_07",
            "stone_01",
            "cabin_02",
        ],
    },
    /* STRIP_FROM_PROD_CLIENT:END */
};

export const OneVFifty = util.mergeDeep({}, Main, mapDef) as MapDef;