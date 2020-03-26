export class Cell {
  value: number;
  temp1: number;
  temp2: number;
  temp3: number;
  temp4: number;

  isLocked: boolean;

  constructor(val: number) {
    this.value = 0;
    this.isLocked = val != 0;
  }
}
