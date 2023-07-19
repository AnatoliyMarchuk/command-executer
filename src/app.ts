import {FfmpegExec} from "./commands/ffmpeg/ffmpegExec";
import {ConsoleLogger} from "./out/console-logger/console-logger";

class App {
    async run() {
        await new FfmpegExec(ConsoleLogger.getInstance()).execute()
    }
}

const app = new App()
app.run!();