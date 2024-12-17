export interface AlertState {
  message: string | null;
  type: ALERT_TYPE | null;
}

export const enum ALERT_TYPE {
  SUCCESS = "SUCCESS",
  DANGER = "DANGER",
}
