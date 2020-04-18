import Manager, { IComponent, ComponentArgs } from "../common/manager.class";
import EnvetsHandler from "./events";
import DotEnv from "dotenv";
import Bot from "./services/bot.service";

/**
 * Main application class
 */
export default class App {
	private manger: Manager | null = null;
	private events: EnvetsHandler | null = null;

	/**
	 * Initializes the app
	 */
	public async initialize(): Promise<void> {
		const components: IComponent[] = [Bot];

		this.manger = new Manager(components);
		this.events = new EnvetsHandler(components);

		const args = await this.getComponentArguments();
		await this.events.registerEvents();
		await this.manger.initialize(args);
	}

	/**
	 * Initializes arguments for the manager
	 */
	private async getComponentArguments(): Promise<ComponentArgs> {
		if (!this.manger) {
			throw new Error("Initialize manager first!");
		}
		DotEnv.config();

		return {
			Bot: [process.env.TOKEN]
		};
	}

	/**
	 * Closes the application
	 */
	public close(): void {
		if (this.manger) {
			this.manger.close();
			this.manger = null;
		}
		this.events = null;
	}
}
