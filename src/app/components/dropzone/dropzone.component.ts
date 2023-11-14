import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent {
  @Input() initialFile!: File[];
  files: File[] = [];

  @Input() multiple!: boolean;
  @Input() accept!: string;
  @Input() maxFileSize!: number;
  @Output() file: EventEmitter<File[]> = new EventEmitter<File[]>();
  @Input() dir: string = "";

  ngOnInit() {
    this.files = this.initialFile;
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    this.file.emit(this.files);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.file.emit(this.files);
  }
}
