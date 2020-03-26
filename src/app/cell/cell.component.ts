import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Cell } from './cell';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  @Input() cell : Cell;
  @Input() isLocked: boolean;

  // cellValue: FormControl;

  constructor() { }

  ngOnInit(): void {
    // this.cellValue = new FormControl('');
    // this.cellValue.patchValue(this.value);
  }

}
