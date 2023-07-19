import {IStreamLogger} from "./stream-logger.interface";
import {ChildProcessWithoutNullStreams} from "child_process";


export class StreamHandler {
    constructor(private logger: IStreamLogger) {
    }

    processOutput(stream: ChildProcessWithoutNullStreams) {
        stream.stdout.on('data', (data) => {
            this.logger.log(data.toString())
        })
        stream.stderr.on('data', (data) => {
            this.logger.error(data.toString)
        })
        stream.on('data', () => {
            this.logger.end()
        })
    }


}
