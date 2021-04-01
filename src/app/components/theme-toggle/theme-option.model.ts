import { ThemeType } from './theme-type.model';

export class ThemeOption {
  constructor(
    public value: ThemeType,
    public icon: string,
    public tooltip: string
  ) {}
}
