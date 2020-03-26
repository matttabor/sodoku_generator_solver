import { Component, OnInit, Input } from '@angular/core';
import { Cell } from './cell';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  @Input() cell : Cell;
  @Input() isLocked: boolean;


  constructor() {

   }

  ngOnInit(): void {
    // this.cellValue = new FormControl('');
    // this.cellValue.patchValue(this.value);
  }

}
