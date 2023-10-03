import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-create-chat-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './create-chat-dialog.component.html',
  styleUrls: ['./create-chat-dialog.component.scss'],
})
export class CreateChatDialogComponent {

}
