import { ActionType } from "./action-type";

export interface IAction{
    type: ActionType;
    payload?: any;
}