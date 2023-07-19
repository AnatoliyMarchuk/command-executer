import {IStreamLogger} from "../../core/handlers/stream-logger.interface";

export class ConsoleLogger implements IStreamLogger {
    private static logger: ConsoleLogger

    private constructor() {
    }

    public static getInstance(): ConsoleLogger {
        if (!ConsoleLogger.logger) {
            ConsoleLogger.logger = new ConsoleLogger()
        }
        return ConsoleLogger.logger
    }

    log(...args: any[]): void {
        console.log(...args)
    }

    error(...ars: any): void {
        console.log(...ars)
    }

    end(): void {
        console.log('Done!')
    }


}