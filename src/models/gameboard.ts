export class GameBoard {
  width: number;
  height: number;
  cells: Cell[][];
}

export class Cell {
  value: number;

  constructor(val: number) {
    this.value = val;
  }

  isEmpty() : boolean {
    return this.value !== null && this.value != 0;
  }
}
