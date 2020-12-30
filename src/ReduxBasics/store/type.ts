export interface IPersonsAction {
    type: string
    [key: string]: any
}

export interface IPerson {
    name: string
    age: number
}

export type IPersonDispatchType = (args: IPersonsAction) => IPersonsAction

