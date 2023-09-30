export class Alert {
  type: AlertType;
  message: string;
  constructor(type: AlertType, message: string) {
    this.type = type;
    this.message = message;
  }
}

export enum AlertType {
  Success = 'notification is-success is-light',
  Error = 'notification is-danger is-light',
  Info = 'notification is-info is-light',
  Warning = 'notification is-warning is-light',
  Link = 'notification is-link is-light',
}
