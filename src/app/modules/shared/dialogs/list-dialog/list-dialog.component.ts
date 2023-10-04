import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

export interface IListDialogInputs {
  title: string;
  description: string;
  data: any[];
  property: string;
}

@Component({
  selector: 'app-list-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.scss'],
})
export class ListDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public inputs: IListDialogInputs,
  ) { }

  public name = new FormControl<string>('');

  public displayedColumns: string[] = ['select', this.inputs.property];
  public dataSource = new MatTableDataSource<any>(this.inputs.data);
  public selection = new SelectionModel<any>(true, []);

  public emitSubmit() {
    const data = {
      name: this.name.value,
      ids: this.selection.selected.map(item => item.id),
    };

    this.dialogRef.close(data);
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
