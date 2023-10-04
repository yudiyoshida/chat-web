import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

export interface IListDialogInputs {
  title: string;
  description: string;
  data: any[];
  property: string;
}

@Component({
  selector: 'app-list-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.scss'],
})
export class ListDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public inputs: IListDialogInputs,
  ) { }

  public displayedColumns: string[] = ['select', this.inputs.property];
  public dataSource = new MatTableDataSource<any>(this.inputs.data);
  public selection = new SelectionModel<any>(true, []);

  public emitSubmit() {
    this.dialogRef.close(this.selection.selected);
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
