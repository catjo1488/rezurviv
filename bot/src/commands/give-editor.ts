import { type ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { botLogger, Command, hasBotPermission } from "../utils";
import { sendNoPermissionMessage } from "./helpers";
import fs from "node:fs";
import path from "node:path";

const CONFIG_PATH = "/opt/rezurviv/survev-config.hjson";

export const giveEditorHandler = {
    command: new SlashCommandBuilder()
        .setName(Command.GiveEditor)
        .setDescription("Give or remove editor access to a Discord user")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The Discord user to give editor access to")
                .setRequired(true),
        )
        .addBooleanOption((option) =>
            option
                .setName("remove")
                .setDescription("Remove editor access instead of granting it")
                .setRequired(false),
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        if (!hasBotPermission(interaction)) {
            await sendNoPermissionMessage(interaction);
            return;
        }

        const user = interaction.options.getUser("user", true);
        const remove = interaction.options.getBoolean("remove") ?? false;

        try {
//эта хрень читает конфиг не трогать
            const hjson = await import("hjson");
            const raw = fs.readFileSync(CONFIG_PATH, "utf-8");
            const config = hjson.parse(raw);

            if (!config.editorUsers) config.editorUsers = [];

            if (remove) {
                config.editorUsers = config.editorUsers.filter((id: string) => id !== user.id);
                fs.writeFileSync(CONFIG_PATH, hjson.stringify(config, { space: 4 }));
                await interaction.editReply(`Removed editor access from <@${user.id}>`);
            } else {
                if (!config.editorUsers.includes(user.id)) {
                    config.editorUsers.push(user.id);
                    fs.writeFileSync(CONFIG_PATH, hjson.stringify(config, { space: 4 }));
                }
                await interaction.editReply(`Granted editor access to <@${user.id}>`);
            }
        } catch (error) {
            botLogger.error("Error in give-editor command:", error);
            await interaction.editReply("An error occurred while updating editor access.");
        }
    },
};