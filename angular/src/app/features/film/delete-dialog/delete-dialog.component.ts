import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/** Delete dialog data. */
export interface DeleteDialogData {

  /** Film name. */
  readonly filmName: string;
}

export type DeleteDialogResult = boolean;

/** Delete dialog. */
@Component({
  selector: 'sw-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDialogComponent {
  public constructor(
    public readonly dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: DeleteDialogData,
  ) {}
}
