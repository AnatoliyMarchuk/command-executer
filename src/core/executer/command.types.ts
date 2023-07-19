export interface ICommandExec {
    command: string,
    args: string[]
}

export interface ICommandExecFfmpeg extends ICommandExec {
    output: string
}