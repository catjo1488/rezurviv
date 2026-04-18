import type { InventoryItem } from "../../gameConfig";
import { type DeepPartial, util } from "../../utils/util";
import { TeamColor } from "../maps/factionDefs";

type BasicRoleWeapon = {
    type: string;
    ammo: number;
    /** guns only, fill inventory to the max of the respective ammo */
    fillInv?: boolean;
};
/**
 * a role weapon not only needs to be conditionally defined depending on what team the player with the role is,
 * but it also needs to be able to be randomly chosen to satisfy the requirements of certain roles like marksman
 */
type RoleWeapon = BasicRoleWeapon | ((teamcolor: TeamColor) => BasicRoleWeapon);

function getTeamWeapon(
    colorToWeaponMap: Record<TeamColor, BasicRoleWeapon>,
    teamcolor: TeamColor,
): BasicRoleWeapon {
    return colorToWeaponMap[teamcolor];
}

function getTeamHelmet(
    colorToHelmetMap: Record<TeamColor, string>,
    teamcolor: TeamColor,
) {
    return colorToHelmetMap[teamcolor];
}

type DefaultItems = {
    weapons: [RoleWeapon, RoleWeapon, RoleWeapon, RoleWeapon];
    backpack: string;
    helmet: string | ((teamcolor: TeamColor) => string);
    chest: string;
    outfit: string | ((teamcolor: TeamColor) => string);
    noDropOutfit?: boolean;
    inventory: Partial<Record<InventoryItem, number>>;
};

export interface RoleDef {
    readonly type: "role";
    announce: boolean;
    killFeed?: {
        assign?: boolean;
        dead?: boolean;
        color?: string;
    };
    sound: {
        assign?: string;
        dead?: string;
    };

    mapIcon?: {
        alive: string;
        dead?: string;
    };
    defaultItems?: DefaultItems;
    perks?: (string | (() => string))[];
    mapIndicator?: {
        sprite: string;
        tint: number;
        pulse: boolean;
        pulseTint: number;
    };
    visorImg?: {
        baseSprite: string;
        spriteScale: number;
    };
    guiImg?: string;
    color?: number;
}

function createDefaultItems(e: DeepPartial<DefaultItems>): DefaultItems {
    const defaultItems: DefaultItems = {
        weapons: [
            { type: "", ammo: 0 },
            { type: "", ammo: 0 },
            { type: "", ammo: 0 },
            { type: "", ammo: 0 },
        ],
        backpack: "",
        helmet: "",
        chest: "",
        outfit: "",
        // perks: [] as Array<{ type: string; droppable?: boolean }>,
        inventory: {
            "9mm": 0,
            "762mm": 0,
            "556mm": 0,
            "12gauge": 0,
            "50AE": 0,
            "308sub": 0,
            flare: 0,
            "45acp": 0,
            frag: 0,
            smoke: 0,
            strobe: 0,
            mirv: 0,
            snowball: 0,
            potato: 0,
            bandage: 0,
            healthkit: 0,
            soda: 0,
            painkiller: 0,
            "1xscope": 1,
            "2xscope": 0,
            "4xscope": 0,
            "8xscope": 0,
            "15xscope": 0,
        },
    };
    return util.mergeDeep(defaultItems, e || {});
}

export const RoleDefs: Record<string, RoleDef> = {
    Admiral: {
        type: "role",
        announce: true,
        killFeed: { assign: true, dead: true },
        sound: {
            assign: "leader_assigned_01",
            dead: "leader_dead_01",
        },
        mapIcon: {
            alive: "player-star.img",
            dead: "skull-leader.img",
        },
        perks: ["leadership"],
        defaultItems: createDefaultItems({
            weapons: [
                (teamcolor: TeamColor) =>
                    getTeamWeapon(
                        {
                            [TeamColor.Red]: { type: "m1014", ammo: 8, fillInv: true },
                            [TeamColor.Blue]: { type: "an94", ammo: 45, fillInv: true },
                        },
                        teamcolor,
                    ),
                { type: "flare_gun", ammo: 1 },
                (teamcolor: TeamColor) =>
                    getTeamWeapon(
                        {
                            [TeamColor.Red]: { type: "machete_taiga", ammo: 0 },
                            [TeamColor.Blue]: { type: "kukri_trad", ammo: 0 },
                        },
                        teamcolor,
                    ),
                { type: "", ammo: 0 },
            ],
            backpack: "backpack03",
            helmet: "helmet04_leader",
            chest: "chest03",
            outfit: (teamcolor: TeamColor) =>
                ({
                    [TeamColor.Red]: "outfitRedLeader",
                    [TeamColor.Blue]: "outfitBlueLeader",
                })[teamcolor],
            noDropOutfit: true,
            inventory: {
                "8xscope": 1,
                bandage: 10,
                healthkit: 1,
            },
        }),
    },
    Vice_Admiral: {
        type: "role",
        announce: true,
        killFeed: { assign: true,},
        sound: {
            assign: "leader_assigned_01",
            dead: "leader_dead_01",
        },
        mapIcon: {
            alive: "player-star.img",
            dead: "skull-leader.img",
        },
        perks: ["gotw"],
        defaultItems: createDefaultItems({
            weapons: [
                (teamcolor: TeamColor) =>
                    getTeamWeapon(
                        {
                            [TeamColor.Red]: { type: "m4a1", ammo: 30, fillInv: true },
                            [TeamColor.Blue]: { type: "grozas", ammo: 30, fillInv: true },
                        },
                        teamcolor,
                    ),
                { type: "", ammo: 0 },
                (teamcolor: TeamColor) =>
                    getTeamWeapon(
                        {
                            [TeamColor.Red]: { type: "machete_taiga", ammo: 0 },
                            [TeamColor.Blue]: { type: "kukri_trad", ammo: 0 },
                        },
                        teamcolor,
                    ),
                { type: "", ammo: 0 },
            ],
            backpack: "backpack03",
            helmet: "helmet04_senior_leader",
            chest: "chest03",
            outfit: (teamcolor: TeamColor) =>
                ({
                    [TeamColor.Red]: "outfitRedLeader",
                    [TeamColor.Blue]: "outfitBlueLeader",
                })[teamcolor],
            noDropOutfit: true,
            inventory: {
                "4xscope": 1,
                bandage: 0,
                healthkit: 0,
            },
        }),
    },
    captain: {
        type: "role",
        announce: true,
        killFeed: { assign: true },
        sound: { assign: "captain_assigned_01" },
        mapIcon: {
            alive: "player-captain.img",
        },
        perks: ["assume_leadership", "firepower"],
        defaultItems: createDefaultItems({
            weapons: [
                { type: "", ammo: 0 },
                { type: "", ammo: 0 },
                { type: "", ammo: 0 },
                { type: "", ammo: 0 },
            ],
            backpack: "backpack03",
            helmet: "helmet04_captain",
            chest: "chest03",
            outfit: (teamcolor: TeamColor) =>
                ({
                    [TeamColor.Red]: "outfitRedLeader",
                    [TeamColor.Blue]: "outfitBlueLeader",
                })[teamcolor],
            noDropOutfit: true,
            inventory: {
                "8xscope": 1,
                bandage: 10,
                healthkit: 1,
                soda: 2,
            },
        }),
    },
    senior_lieutenant: {
        type: "role",
        announce: true,
        killFeed: { assign: true },
        sound: { assign: "lt_assigned_01" },
        perks: ["firepower"],
        defaultItems: createDefaultItems({
            weapons: [
                { type: "", ammo: 0 },
                (teamcolor: TeamColor) =>
                    getTeamWeapon(
                        {
                            [TeamColor.Red]: { type: "m4a1", ammo: 40, fillInv: true },
                            [TeamColor.Blue]: { type: "grozas", ammo: 40, fillInv: true },
                        },
                        teamcolor,
                    ),
                { type: "spade_assault", ammo: 0 },
                { type: "", ammo: 0 },
            ],
            backpack: "backpack03",
            helmet: "helmet03_lt_aged",
            chest: "chest03",
            inventory: {
                "4xscope": 1,
                bandage: 10,
                healthkit: 2,
                soda: 4,
            },
        }),
    },
    lieutenant: {
        type: "role",
        announce: true,
        killFeed: { assign: true },
        sound: { assign: "lt_assigned_01" },
        perks: ["firepower"],
        defaultItems: createDefaultItems({
            weapons: [
                { type: "", ammo: 0 },
                (teamcolor: TeamColor) =>
                    getTeamWeapon(
                        {
                            [TeamColor.Red]: { type: "scorpion", ammo: 40, fillInv: true },
                            [TeamColor.Blue]: { type: "scar", ammo: 40, fillInv: true },
                        },
                        teamcolor,
                    ),
                { type: "spade_assault", ammo: 0 },
                { type: "", ammo: 0 },
            ],
            backpack: "backpack03",
            helmet: "helmet03_lt",
            chest: "chest02",
            inventory: {
                "4xscope": 1,
                bandage: 10,
                healthkit: 1,
                soda: 2,
            },
        }),
    },
    combat_medic: {
        type: "role",
        announce: true,
        killFeed: { assign: true },
        sound: { assign: "medic_assigned_01" },
        mapIcon: {
            alive: "player-medic.img",
            dead: "skull-leader.img",
        },
        perks: ["aoe_heal", "self_revive"],
        defaultItems: createDefaultItems({
            weapons: [
                { type: "", ammo: 0 },
                { type: "", ammo: 0 },
                { type: "bonesaw_rusted", ammo: 0 },
                { type: "smoke", ammo: 0 },
            ],
            backpack: "backpack03",
            helmet: "helmet04_medic",
            chest: "chest03",
            inventory: {
                "4xscope": 1,
                bandage: 30,
                healthkit: 4,
                painkiller: 4,
                soda: 15,
                smoke: 6,
            },
        }),
    },
    medic: {
        type: "role",
        announce: true,
        killFeed: { assign: true },
        sound: { assign: "medic_assigned_01" },
        mapIcon: {
            alive: "player-medic.img",
            dead: "skull-leader.img",
        },
        perks: ["aoe_heal"],
        defaultItems: createDefaultItems({
            weapons: [
                { type: "", ammo: 0 },
                { type: "", ammo: 0 },
                { type: "", ammo: 0 },
                { type: "smoke", ammo: 0 },
            ],
            backpack: "backpack03",
            chest: "chest03",
            helmet: (teamcolor: TeamColor) =>
                ({
                    [TeamColor.Red]: "helmet04_medic01",
                    [TeamColor.Blue]: "helmet04_medic02",
                })[teamcolor],
            inventory: {
                "4xscope": 1,
                bandage: 15,
                healthkit: 2,
                painkiller: 2,
                soda: 7,
                smoke: 3,
            },
        }),
    },
    marksman: {
        type: "role",
        announce: true,
        killFeed: { assign: true },
        sound: { assign: "marksman_assigned_01" },
        perks: ["targeting"],
        defaultItems: createDefaultItems({
            weapons: [
                { type: "", ammo: 0 },
                (teamcolor: TeamColor) =>
                    getTeamWeapon(
                        {
                            [TeamColor.Red]: util.weightedRandom([
                                { type: "garand", ammo: 8, fillInv: true, weight: 0.9 },

                            ]),
                            [TeamColor.Blue]: util.weightedRandom([
                                { type: "garand", ammo: 8, fillInv: true, weight: 0.9 },

                            ]),
                        },
                        teamcolor,
                    ),
                { type: "kukri_sniper", ammo: 0 },
                { type: "", ammo: 0 },
            ],
            backpack: "backpack03",
            helmet: "helmet03_marksman",
            chest: "chest03",
            inventory: {
                "8xscope": 1,
                bandage: 5,
            },
        }),
    },
    Sniper_saboteur: {
        type: "role",
        announce: true,
        killFeed: { assign: true },
        sound: { assign: "marksman_assigned_01" },
        perks: ["chambered"],
        defaultItems: createDefaultItems({
            weapons: [
                { type: "", ammo: 0 },
                (teamcolor: TeamColor) =>
                    getTeamWeapon(
                        {
                            [TeamColor.Red]: util.weightedRandom([
                                { type: "blr", ammo: 3, fillInv: true, weight: 0.9 },

                            ]),
                            [TeamColor.Blue]: util.weightedRandom([
                                { type: "blr", ammo: 3, fillInv: true, weight: 0.9 },

                            ]),
                        },
                        teamcolor,
                    ),
                { type: "kukri_sniper", ammo: 0 },
                { type: "", ammo: 0 },
            ],
            backpack: "backpack03",
            helmet: "helmet03_mr",
            chest: "chest03",
            inventory: {
                "4xscope": 1,
                bandage: 2,
            },
        }),
    },
   quartermaster_recon: {
        type: "role",
        announce: true,
        killFeed: { assign: true },
        sound: { assign: "recon_assigned_01" },
        perks: ["small_arms", "bonus_9mm",],
        defaultItems: createDefaultItems({
            weapons: [
                { type: "", ammo: 0 },
                { type: "vector", ammo: 30, fillInv: true },
                { type: "crowbar_recon", ammo: 0 },
                { type: "", ammo: 0 },
            ],
            backpack: "backpack03",
            helmet: "helmet03_quartermaster_recon",
            chest: "chest03",
            inventory: {
                "4xscope": 1,
                soda: 6,
                bandage: 5,
            },
        }),
    },
    recon: {
        type: "role",
        announce: true,
        killFeed: { assign: true },
        sound: { assign: "recon_assigned_01" },
        perks: ["small_arms"],
        defaultItems: createDefaultItems({
            weapons: [
                { type: "", ammo: 0 },
                { type: "glock_dual", ammo: 34, fillInv: true },
                { type: "crowbar_recon", ammo: 0 },
                { type: "", ammo: 0 },
            ],
            backpack: "backpack03",
            helmet: "helmet03_recon",
            chest: "chest03",
            inventory: {
                "4xscope": 1,
                soda: 3,
                bandage: 0,
            },
        }),
    },
    front_line_grenadier: {
        type: "role",
        announce: true,
        killFeed: { assign: true },
        sound: { assign: "grenadier_assigned_01" },
        perks: ["flak_jacket", "broken_arrow"],
        defaultItems: createDefaultItems({
            weapons: [
                { type: "", ammo: 0 },
                { type: "saiga", ammo: 5, fillInv: true },
                { type: "katana", ammo: 0 },
                { type: "mirv", ammo: 8 },
            ],
            backpack: "backpack03",
            helmet: "helmet03_grenadier",
            chest: "chest03",
            inventory: {
                mirv: 8,
                frag: 12,
                strobe: 2,
                "4xscope": 1,
                bandage: 5,
            },
        }),
    },
     regimental_grenadier: {
        type: "role",
        announce: true,
        killFeed: { assign: true },
        sound: { assign: "grenadier_assigned_01" },
        perks: ["fabricate"],
        defaultItems: createDefaultItems({
            weapons: [
                { type: "", ammo: 0 },
                { type: "saiga", ammo: 5, fillInv: true },
                { type: "katana", ammo: 0 },
                { type: "mirv", ammo: 8 },
            ],
            backpack: "backpack03",
            helmet: "helmet03_grenadier",
            chest: "chest03",
            inventory: {
                mirv: 4,
                frag: 6,

                "4xscope": 1,
                bandage: 5,
            },
        }),
    },
    bugler: {
        type: "role",
        announce: false,
        killFeed: { assign: true },
        sound: { assign: "bugler_assigned_01" },
        perks: ["inspiration", "final_bugle","martyrdom"],
        defaultItems: createDefaultItems({
            weapons: [
                { type: "", ammo: 0 },
                { type: "bugle", ammo: 1 },
                { type: "pan", ammo: 0 },
                { type: "", ammo: 0 },
            ],
            backpack: "backpack03",
            helmet: "helmet03_bugler",
            chest: "chest03",
            inventory: {
                "4xscope": 1,
                bandage: 5,
            },
        }),
    },
        undefeated: {
        type: "role",
        announce: true,
        killFeed: { assign: true },
        sound: { assign: "" },
        perks: ["armor_master", "low_hp_surge", "melee_striker","melee_runner","final_bugle","inspiration","martyrdom"],
        defaultItems: createDefaultItems({
            weapons: [
                { type: "bugle", ammo: 1 },
                { type: "katana_hacker", ammo: 0 },
            ],
            backpack: "backpack03",
            helmet: "helmet04_moon",
            chest: "chest03",
            inventory: {
                "4xscope": 1,
                bandage: 5,
            },
        }),
    },
    last_man: {
        type: "role",
        announce: false,
        killFeed: { assign: true },
        sound: { assign: "last_man_assigned_01" },
        perks: [
            "steelskin",
            () =>
                util.weightedRandom([
                    { type: "ap_rounds", weight: 1 },
                    { type: "splinter", weight: 1 },
                ]).type,
            "takedown",
            () =>
                util.weightedRandom([
                    { type: "windwalk", weight: 1 },
                    { type: "field_medic", weight: 1 },
                ]).type,
        ],
        defaultItems: createDefaultItems({
            weapons: [
                { type: "", ammo: 0 },
                (teamcolor: TeamColor) =>
                    getTeamWeapon(
                        {
                            [TeamColor.Red]: util.weightedRandom([
                                { type: "m249", ammo: 100, fillInv: true, weight: 1 },
                                { type: "pkp", ammo: 200, fillInv: true, weight: 1 },
                            ]),
                            [TeamColor.Blue]: util.weightedRandom([
                                { type: "m249", ammo: 100, fillInv: true, weight: 1 },
                                { type: "pkp", ammo: 200, fillInv: true, weight: 1 },
                            ]),
                        },
                        teamcolor,
                    ),
                { type: "", ammo: 0 },
                { type: "mirv", ammo: 8 },
            ],
            backpack: "backpack03",
            helmet: (teamcolor: TeamColor) =>
                getTeamHelmet(
                    {
                        [TeamColor.Red]: "helmet04_last_man_red",
                        [TeamColor.Blue]: "helmet04_last_man_blue",
                    },
                    teamcolor,
                ),
            chest: "chest04",
            inventory: {
                mirv: 8,
                "8xscope": 1,
                bandage: 10,
                healthkit: 1,
                soda: 2,
            },
        }),
    },
archangel_1: {
    type: "role",
    announce: true,
    killFeed: { assign: true },
    sound: { assign: "leader_assigned_02" },
    mapIcon: {
        alive: "player-the-hunted.img",
    },
    mapIndicator: {
        sprite: "player-the-hunted.img",
        tint: 0xffaa00,
        pulse: false,
        pulseTint: 0xffaa00,
    },
    perks: ["steelskin","splinter","windwalk","firepower","field_medic","ap_rounds","melee_striker","armor_master","woods","flac_jacket"],
    defaultItems: createDefaultItems({
        weapons: [
             { type: "pkp", ammo: 200, fillInv: true, weight: 1 },
            { type: "", ammo: 0 },
            { type: "", ammo: 0 },
            { type: "", ammo: 0 },
        ],
        outfit: "outfitDesertCamo",
        backpack: "backpack03",
        helmet: "archangel",
        chest: "chest05",
        inventory: {
            bandage: 5,
            "4xscope": 1,
        },
    }),
},
Humility01: {
    type: "role",
    announce: true,
    killFeed: { assign: true },
    sound: { assign: "leader_assigned_02" },
    mapIcon: {
        alive: "player-the-hunted.img",
    },
    mapIndicator: {
        sprite: "player-the-hunted.img",
        tint: 0xffaa00,
        pulse: false,
        pulseTint: 0xffaa00,
    },
    perks: ["steelskin","splinter","windwalk","firepower","field_medic","ap_rounds","melee_striker","armor_master","woods","flac_jacket"],
    defaultItems: createDefaultItems({
        weapons: [
             { type: "pkp", ammo: 200, fillInv: true, weight: 1 },
            { type: "", ammo: 0 },
            { type: "", ammo: 0 },
            { type: "", ammo: 0 },
        ],
        outfit: "outfitDesertCamo",
        backpack: "backpack03",
        helmet: "Humility",
        chest: "chest05",
        inventory: {
            bandage: 5,
            "4xscope": 1,
        },
    }),
},  
archangel_3: {
    type: "role",
    announce: true,
    killFeed: { assign: true },
    sound: { assign: "leader_assigned_02" },
    mapIcon: {
        alive: "player-the-hunted.img",
    },
    mapIndicator: {
        sprite: "player-the-hunted.img",
        tint: 0xffaa00,
        pulse: false,
        pulseTint: 0xffaa00,
    },
    perks: ["steelskin","splinter","windwalk","firepower","field_medic","ap_rounds","melee_striker","armor_master","woods","flac_jacket"],
    defaultItems: createDefaultItems({
        weapons: [
             { type: "pkp", ammo: 200, fillInv: true, weight: 1 },
            { type: "", ammo: 0 },
            { type: "", ammo: 0 },
            { type: "", ammo: 0 },
        ],
        outfit: "outfitDesertCamo",
        backpack: "backpack03",
        helmet: "archangel2",
        chest: "chest05",
        inventory: {
            bandage: 5,
            "4xscope": 1,
        },
    }),
},
archangel_4: {
    type: "role",
    announce: true,
    killFeed: { assign: true },
    sound: { assign: "leader_assigned_02" },
    mapIcon: {
        alive: "player-the-hunted.img",
    },
    mapIndicator: {
        sprite: "player-the-hunted.img",
        tint: 0xffaa00,
        pulse: false,
        pulseTint: 0xffaa00,
    },
    perks: ["steelskin","splinter","windwalk","firepower","field_medic","ap_rounds","melee_striker","armor_master","woods","flac_jacket"],
    defaultItems: createDefaultItems({
        weapons: [
             { type: "pkp", ammo: 200, fillInv: true, weight: 1 },
            { type: "", ammo: 0 },
            { type: "", ammo: 0 },
            { type: "", ammo: 0 },
        ],
        outfit: "outfitDesertCamo",
        backpack: "backpack03",
        helmet: "archangel3",
        chest: "chest05",
        inventory: {
            bandage: 5,
            "4xscope": 1,
        },
    }),
},
    // Дезертир - стартовая роль (0 минут)
deserter_1: {
    type: "role",
    announce: true,
    killFeed: { assign: true },
    sound: { assign: "leader_assigned_02" },
    mapIcon: {
        alive: "player-the-hunted.img",
    },
    mapIndicator: {
        sprite: "player-the-hunted.img",
        tint: 0xffaa00,
        pulse: false,
        pulseTint: 0xffaa00,
    },
    perks: ["steelskin","splinter","windwalk","firepower","field_medic","ap_rounds","melee_striker","armor_master","woods","flac_jacket"],
    defaultItems: createDefaultItems({
        weapons: [
             { type: "pkp", ammo: 200, fillInv: true, weight: 1 },
            { type: "", ammo: 0 },
            { type: "Black_Death", ammo: 0, weight: 1 },
            { type: "", ammo: 0 },
        ],
        outfit: "outfitRedLeader",
        backpack: "backpack03",
        helmet: "one_V50lvl5",
        chest: "chest06",
        inventory: {
            bandage: 5,
            "4xscope": 1,
        },
    }),
},

// Дезертир - 1 минута
deserter_2: {
    type: "role",
    announce: true,
    killFeed: { assign: true },
    sound: { assign: "leader_assigned_02" },
    mapIcon: {
        alive: "player-the-hunted.img",
    },
    mapIndicator: {
        sprite: "player-the-hunted.img",
        tint: 0xff8800,
        pulse: false,
        pulseTint: 0xff8800,
    },
    perks: ["steelskin","splinter","firepower","field_medic","melee_striker","armor_master","gotw"],
    defaultItems: createDefaultItems({
        weapons: [
            { type: "pkp", ammo: 200, fillInv: true, weight: 1 },
            { type: "", ammo: 0 },
            { type: "", ammo: 0 },
            { type: "mirv", ammo: 8 },
        ],
        backpack: "backpack03",
        helmet: "one_V50lvl4",
        chest: "chest05",
        inventory: {
            mirv:2,
            bandage: 8,
            soda: 2,
            "4xscope": 1,
        },
    }),
},

// Дезертир - 2 минуты
deserter_3: {
    type: "role",
    announce: true,
    killFeed: { assign: true },
    sound: { assign: "leader_assigned_02" },
    mapIcon: {
        alive: "player-the-hunted.img",
    },
    mapIndicator: {
        sprite: "player-the-hunted.img",
        tint: 0xff5500,
        pulse: false,
        pulseTint: 0xff5500,
    },
 perks: ["small_arms","steelskin","splinter","firepower","field_medic","melee_striker","armor_master","gotw"],
    defaultItems: createDefaultItems({
        weapons: [
            { type: "", },
            { type: "", },
            { type: "", ammo: 0 },
            { type: "mirv", ammo: 4 },
        ],
        backpack: "backpack03",
        helmet: "one_V50lvl3",
        chest: "chest05",
        inventory: {
            mirv:4,
            bandage: 10,
            healthkit: 1,
            soda: 3,
            "4xscope": 1,
        },
    }),
},

// Дезертир - 3 минуты
deserter_4: {
    type: "role",
    announce: true,
    killFeed: { assign: true },
    sound: { assign: "leader_assigned_02" },
    mapIcon: {
        alive: "player-the-hunted.img",
    },
    mapIndicator: {
        sprite: "player-the-hunted.img",
        tint: 0xff2200,
        pulse: true,
        pulseTint: 0xff2200,
    },
    perks: ["small_arms","steelskin","splinter","windwalk","firepower","field_medic","melee_striker","armor_master",],
    defaultItems: createDefaultItems({
        weapons: [
            { type: "",  },
            { type: "",  },
            { type: "", ammo: 0 },
            { type: "mirv", ammo: 6 },
        ],
        backpack: "backpack03",
        helmet: "one_V50lvl2",
        chest: "chest05",
        inventory: {
            mirv:6,
            bandage: 15,
            healthkit: 2,
            soda: 5,
            frag: 3,
            "4xscope": 1,
        },
    }),
},

// Дезертир - 4 минуты (финальная форма)
deserter_5: {
    type: "role",
    announce: true,
    killFeed: { assign: true },
    sound: { assign: "leader_assigned_02" },
    mapIcon: {
        alive: "player-the-hunted.img",
        dead: "skull-leader.img",
    },
    mapIndicator: {
        sprite: "player-the-hunted.img",
        tint: 0xff0000,
        pulse: true,
        pulseTint: 0xff0000,
    },
    perks: ["small_arms","steelskin","field_medic","armor_master","gotw","firepower"],
    defaultItems: createDefaultItems({
        weapons: [
            { type: "m249", ammo: 100, fillInv: true },
            { type: "", ammo: 0, },
            { type: "", ammo: 0 },
            { type: "mirv", ammo: 8},
        ],
        backpack: "backpack03",
        helmet: "one_V50",
        chest: "chest03",
        inventory: {
            mirv:8,
            bandage: 20,
            healthkit: 3,
            soda: 8,
            painkiller: 2,
            "8xscope": 1,
        },
    }),
},
    woods_king: {
        type: "role",
        announce: false,
        killFeed: { dead: true, color: "#12ff00" },
        sound: { dead: "leader_dead_01" },
        perks: ["gotw", "windwalk"],
    },
    kill_leader: {
        type: "role",
        announce: false,
        killFeed: { assign: true, dead: true, color: "#ff8400" },
        sound: {
            assign: "leader_assigned_01",
            dead: "leader_dead_01",
        },
    },
    the_hunted: {
        type: "role",
        announce: true,
        killFeed: { assign: true, dead: true, color: "#ff8400" },
        sound: {
            assign: "leader_assigned_01",
            dead: "leader_dead_01",
        },
        mapIndicator: {
            sprite: "player-the-hunted.img",
            tint: 0xff8400,
            pulse: true,
            pulseTint: 0xff8400,
        },
        perks: ["hunted"],
    },
    healer: {
        type: "role",
        defaultItems: createDefaultItems({
            outfit: "outfitMedic",
            inventory: {
                healthkit: 1,
            },
        }),
         announce: true,
        sound: { assign: "spawn_01" },
        perks: ["field_medic", "windwalk"],
        visorImg: {
            baseSprite: "player-visor-healer.img",
            spriteScale: 0.3,
        },
        guiImg: "img/gui/role-healer.svg",
        color: 0xaf00af,
    },
    tank: {
        type: "role",
        defaultItems: createDefaultItems({
            outfit: "outfitTank",
            chest: "chest01",
        }),
         announce: true,
        sound: { assign: "spawn_01" },
        perks: ["steelskin", "endless_ammo"],
        visorImg: {
            baseSprite: "player-visor-tank.img",
            spriteScale: 0.3,
        },
        guiImg: "img/gui/role-tank.svg",
        color: 0xd38600,
    },
    sniper: {
        type: "role",
        defaultItems: createDefaultItems({
            outfit: "outfitSniper",
            inventory: {
                "2xscope": 1,
            },
        }),
         announce: true,
        sound: { assign: "spawn_01" },
        perks: ["chambered", "takedown"],
        visorImg: {
            baseSprite: "player-visor-sniper.img",
            spriteScale: 0.3,
        },
        guiImg: "img/gui/role-sniper.svg",
        color: 0x77e8,
    },
    scout: {
        type: "role",
        defaultItems: createDefaultItems({
            outfit: "outfitScout",
            inventory: {
                soda: 1,
            },
        }),
         announce: true,
        sound: { assign: "spawn_01" },
        perks: ["small_arms", "tree_climbing"],
        visorImg: {
            baseSprite: "player-visor-scout.img",
            spriteScale: 0.3,
        },
        guiImg: "img/gui/role-scout.svg",
        color: 0x66a000,
    },
    demo: {
        type: "role",
        defaultItems: createDefaultItems({
            outfit: "outfitDemo",
            backpack: "backpack01",
        }),
         announce: true,
        sound: { assign: "spawn_01" },
        perks: ["fabricate", "flak_jacket"],
        visorImg: {
            baseSprite: "player-visor-demo.img",
            spriteScale: 0.3,
        },
        guiImg: "img/gui/role-demo.svg",
        color: 0x670300,
    },
    assault: {
        type: "role",
        defaultItems: createDefaultItems({
            outfit: "outfitAssault",
            inventory: {
                bandage: 5,
            },
        }),
        announce: true,
        sound: { assign: "spawn_01" },
        perks: ["firepower", "bonus_assault"],
        visorImg: {
            baseSprite: "player-visor-assault.img",
            spriteScale: 0.3,
        },
        guiImg: "img/gui/role-assault.svg",
        color: 0xffec17,
    },
};