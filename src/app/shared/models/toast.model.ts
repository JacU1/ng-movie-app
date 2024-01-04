export interface ToastModel {
    type: ToastTypes;
    message: string;
    show: boolean
}

export enum ToastTypes { 
    SUCCES = "success",
    DANGER = "danger",
    WARNING = "warning",
    INFO = "info"
}