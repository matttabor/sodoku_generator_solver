import { Component } from "@angular/core";
import { Cell } from './cell/cell';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "soduku";

   board: Cell[][];

  constructor() {
    this.initializeEmptyBoard();
    // this.board = [
    //   [7, 8, 0, 4, 0, 0, 1, 2, 0],
    //   [6, 0, 0, 0, 7, 5, 0, 0, 9],
    //   [0, 0, 0, 6, 0, 1, 0, 7, 8],
    //   [0, 0, 7, 0, 4, 0, 2, 6, 0],
    //   [0, 0, 1, 0, 5, 0, 9, 3, 0],
    //   [9, 0, 4, 0, 6, 0, 0, 0, 5],
    //   [0, 7, 0, 3, 0, 0, 0, 1, 2],
    //   [1, 2, 0, 0, 0, 7, 4, 0, 0],
    //   [0, 4, 9, 2, 0, 6, 0, 0, 7]
    // ];
  }

  initializeEmptyBoard() {
    this.board = [];
    for(let i = 0; i < 9; i++) {
      this.board[i] = [];
      for(let j = 0; j < 9; j++) {
        this.board[i][j] = new Cell(0);
      }
    }
  }

  generateGame(): void {
     this.initializeEmptyBoard();

    let numFilledCells = 25;
    while(numFilledCells >=0 ) {
      let row = Math.floor(Math.random() * 9);
      let col = Math.floor(Math.random() * 9);

      if(this.board[row][col].value == 0){
        let valid = false;
        while(!valid) {
          let value = Math.floor(Math.random() * 10);
          if(this.isValid(value, row, col)) {
            this.board[row][col].value = value;
            valid = true;
          }
        }
        numFilledCells--;
      }
    }

  }

solve(): boolean {
    var nextEmptyCell = this.findNextEmpty();

    if (nextEmptyCell == null) {
      return true;
    }

    for (let i = 1; i < 10; i++) {
      if (this.isValid(i, nextEmptyCell.row, nextEmptyCell.col)) {
        this.board[nextEmptyCell.row][nextEmptyCell.col].value = i;

        if (this.solve()) {
          return true;
        }
        //await delay(300);
        this.board[nextEmptyCell.row][nextEmptyCell.col].value = 0;
      }
    }

    return false;
  }

  isValid(val: number, row: number, col: number): boolean {
    // check row
    for (let i = 0; i < this.board[row].length; i++) {
      if (this.board[row][i].value == val) {
        return false;
      }
    }
    // check col
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i][col].value == val) {
        return false;
      }
    }
    // check containing box
    const x = Math.floor(col / 3);
    const y = Math.floor(row / 3);

    for (let i = y * 3; i < y * 3 + 3; i++) {
      for (let j = x * 3; j < x * 3 + 3; j++) {
        if (this.board[i][j].value == val) {
          return false;
        }
      }
    }

    return true;
  }

  // Finds the next empty cell (aka a cell that has a value of 0).
  // If no empty cell can be found then it will return null
  findNextEmpty(): { row: number; col: number } {
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if (this.board[row][col].value == 0) {
          return { row: row, col: col };
        }
      }
    }

    return null;
  }
}
