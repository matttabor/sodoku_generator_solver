import { Component } from "@angular/core";
import { Cell } from "./cell/cell";

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
  }

  initializeEmptyBoard() {
    this.board = [];
    for (let i = 0; i < 9; i++) {
      this.board[i] = [];
      for (let j = 0; j < 9; j++) {
        this.board[i][j] = new Cell(0);
      }
    }
  }

  generateGame(): void {
    this.initializeEmptyBoard();

    // fill diagonal 3x3 matrices first
    this.fillDiagonal();
    this.solve();
    // remove n number of elements to make the board playable
    this.removeRandomKCells();
  }

  removeRandomKCells() {
    let count = 45; // this should be an input from the user to change dificulty maybe

    while (count >= 0) {
      let index = Math.floor(Math.random() * 81);
      var row = index % 9;
      var col = Math.floor(index / 9);

      if(this.board[row][col].value != 0){
        this.board[row][col].value = 0;
        this.board[row][col].isLocked = false;
        count--;
      }
    }
  }

  fillDiagonal() {
    for (let i = 0; i < 9; i = i + 3) {
      this.fillBox(i, i);
    }
  }

  // Fill a 3 x 3 matrix.
  fillBox(row: number, col: number): void {
    let num;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        do {
          num = Math.floor(Math.random() * 9 + 1);
        } while (!this.unUsedInBox(row, col, num));

        this.board[row + i][col + j].value = num;
        this.board[row + i][col + j].isLocked = true;
      }
    }
  }

  // Returns false if given 3 x 3 block contains num.
  unUsedInBox(rowStart: number, colStart: number, num: number): boolean {
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (this.board[rowStart + i][colStart + j].value == num) return false;

    return true;
  }

  solve(): boolean {
    var nextEmptyCell = this.findNextEmpty();

    if (nextEmptyCell == null) {
      return true;
    }

    for (let i = 1; i < 10; i++) {
      if (this.isValid(i, nextEmptyCell.row, nextEmptyCell.col)) {
        this.board[nextEmptyCell.row][nextEmptyCell.col].value = i;
        this.board[nextEmptyCell.row][nextEmptyCell.col].isLocked = true;

        if (this.solve()) {
          return true;
        }
        //await delay(300);
        this.board[nextEmptyCell.row][nextEmptyCell.col].value = 0;
        this.board[nextEmptyCell.row][nextEmptyCell.col].isLocked = false;
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
