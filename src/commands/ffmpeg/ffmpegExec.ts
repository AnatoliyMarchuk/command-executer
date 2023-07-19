import {CommandExecutor} from "../../core/executer/executer.commandexecuter";
import {ICommandExecFfmpeg} from "../../core/executer/command.types";
import {IStreamLogger} from "../../core/handlers/stream-logger.interface";
import {ChildProcessWithoutNullStreams, spawn} from "child_process";
import {IFfmpegTypes} from "../../core/executer/ffmpeg,types";
import {FileService} from "../../core/Files/file.service";
import {PromptService} from "../../core/prompt/prompt.service";
import {StreamHandler} from "../../core/handlers/stream.handler";
import {FfmpegBuilder} from "./ffmpeg.builder";

export class FfmpegExec extends CommandExecutor<IFfmpegTypes> {
    private fileService: FileService = new FileService()
    private promptService: PromptService = new PromptService()

    constructor(logger: IStreamLogger) {
        super(logger);
    }

    protected async prompt(): Promise<IFfmpegTypes> {
        const width = await this.promptService.input<number>('Ширина', 'number')
        const height = await this.promptService.input<number>('Висота', 'number')
        const path = await this.promptService.input<string>('Шлях до файлу', 'input')
        const name = await this.promptService.input<string>('імя файлу', 'input')
        return {width, height, path, name}
    }

    protected build({width, height, path, name}: IFfmpegTypes): ICommandExecFfmpeg {
        const output = this.fileService.getFilePath(path, name, 'mp4')
        const args = (new FfmpegBuilder())
            .setVideoSize(width, height)
            .input(path)
            .output(output)
        return {command: 'ffmpeg', args, output}

    }

    protected spawn({output, command, args}: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {

        this.fileService.deleteFileIfExist!(output);
        return spawn(command, args)
    }

    protected processedStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger) {
        const handler = new StreamHandler(logger)
        handler.processOutput(stream)
    }
}

