import { type ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { botLogger, Command, hasBotPermission, honoClient } from "../utils";
import { sendNoPermissionMessage } from "./helpers";

export const giveEditorHandler = {
    command: new SlashCommandBuilder()
        .setName(Command.GiveEditor)
        .setDescription("Grant or revoke editor access by account slug")
        .addStringOption((option) =>
            option
                .setName("slug")
                .setDescription("Account slug of the player")
                .setRequired(true),
        )
        .addStringOption((option) =>
            option
                .setName("action")
                .setDescription("grant or revoke")
                .setRequired(true)
                .addChoices(
                    { name: "grant", value: "grant" },
                    { name: "revoke", value: "revoke" },
                ),
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        if (!hasBotPermission(interaction)) {
            await sendNoPermissionMessage(interaction);
            return;
        }

        const slug = interaction.options.getString("slug")!;
        const action = interaction.options.getString("action")! as "grant" | "revoke";

        await interaction.deferReply();

        try {
            const res = await honoClient.editor.set_access.$post({
                json: { slug, action },
            });

            if (!res.ok) {
                await interaction.editReply({ content: "Failed to update editor access" });
                return;
            }

            await interaction.editReply({
                content: `✅ Editor access **${action}ed** for \`${slug}\``,
            });
        } catch (error) {
            botLogger.error("Error in give_editor command:", error);
            await interaction.editReply({
                content: "An error occurred while updating editor access.",
            });
        }
    },
};