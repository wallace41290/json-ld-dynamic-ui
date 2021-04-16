export class WarnableResponse<T> {
  constructor(public response: T, public warning?: string) {}
}
