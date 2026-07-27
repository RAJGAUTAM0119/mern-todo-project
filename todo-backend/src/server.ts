import app from "./app.ts";
import { connectDB } from "./config/database.ts";
import { env } from "./config/env.config.ts";

const { PORT } = env;
const startServer = async (): Promise<void> => {
	try {
		await connectDB();
		app.listen(PORT, () => {
			console.log(`🚀 server is running on port http://localhost:${PORT}`);
		});
	} catch (error: unknown) {
		console.error("Failed to start server: ", error);
		process.exit(1);
	}
};

startServer();
