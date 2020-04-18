import Service from "../../common/service.abstract";
import Discord, { TextChannel, VoiceState } from "discord.js";
import Utils, { LogType } from "../../common/utils.class";

/**
 * Service that represents template for a new services
 */
export default class Bot extends Service<"">() {
	private static bot: Discord.Client;

	/**
	 * Initialization of Bot service
	 */
	public static async initialize(token: string): Promise<void> {
		this.bot = new Discord.Client();
		this.bot.login(token);

		this.bot.on("ready", () => {
			Utils.log(`Logged in as ${this.bot.user?.tag}!`);
		});

		this.registerEvenets();
	}

	/**
	 * Registers stream crash event
	 */
	private static registerEvenets(): void {
		//On stream crash
		this.bot.on(
			"voiceStateUpdate",
			async (oldState: VoiceState, newState: VoiceState) => {
				if (oldState.streaming && !newState.channel) {
					try {
						const channel = this.getChannel(newState.guild);
						if (!channel) return;
						//Send F message
						const message = await channel.send(
							":regional_indicator_f:"
						);
						//React to F message
						message.react("\u{1f1eb}");
						Utils.log(`F reported at "${message.guild?.name}".`);
					} catch (exception) {
						//Report errors
						Utils.log(
							`Voice state update exception:\n\t` +
								`${exception.stack.replace(/\n/g, "\n\t")}`,
							LogType.ERROR
						);
					}
				}
			}
		);
	}

	/**
	 * Finds a default channel to write messages
	 * @param guild Guild to search channel
	 */
	private static getChannel(guild: Discord.Guild): TextChannel | null {
		return guild.channels.cache
			.filter(channel => {
				if (channel.type !== "text") return false;
				if (!guild.me) return false;
				const permissions = channel.permissionsFor(guild.me);
				if (!permissions) return false;
				if (!permissions.has("SEND_MESSAGES")) return false;
				return true;
			})
			.sort((a, b) => {
				if (b.id === guild.systemChannelID) return 1;
				if (a.id === guild.systemChannelID) return -1;
				return a.position < b.position ? -1 : 1;
			})
			.first() as TextChannel;
	}
}
