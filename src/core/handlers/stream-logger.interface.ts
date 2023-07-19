export interface IStreamLogger {
    log(...args: any[]): void

    error(...ars: any): void

    end(): void
}