import {IStreamLogger} from "../handlers/stream-logger.interface";
import {ChildProcessWithoutNullStreams} from "child_process";
import {ICommandExec} from "./command.types";

export abstract class CommandExecutor<Input> {
    protected constructor(private logger: IStreamLogger) {
    }

    public async execute() {
        const input = await this.prompt()
        const command = this.build(input)
        const stream = this.spawn(command)
        this.processedStream(stream, this.logger)
    }

    protected abstract prompt(): Promise<Input>


    protected abstract build(input: Input): ICommandExec

    protected abstract spawn(command: ICommandExec): ChildProcessWithoutNullStreams

    protected abstract processedStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void

}

// class CommandExecute extends Command {
//     protected inputData(): void {
//         console.log('Input Data!')
//     }
//
//     protected buildData(): void {
//         console.log('buildData')
//     }
//
//
//     protected spawnData(): void {
//         console.log('spawnData')
//     }
//
//     protected processedStreamData(): void {
//         console.log('processedStreamData')
//     }
//
// }
