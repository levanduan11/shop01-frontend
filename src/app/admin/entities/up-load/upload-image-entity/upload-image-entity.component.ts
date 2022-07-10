import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
} from '@angular/fire/compat/storage';
import { async } from '@angular/core/testing';

@Component({
  selector: 'upload-image-entity',
  templateUrl: './upload-image-entity.component.html',
  styleUrls: ['./upload-image-entity.component.css'],
})
export class UploadImageEntityComponent implements OnInit {
  selectedFile: FileList | null = null;
  currentFile: File | null = null;
  ref!: AngularFireStorageReference;
  isLoading = false;
  message = '';

  @Output() shareURL = new EventEmitter<string>();
  @Input() name = '';

  constructor(private fireStorage: AngularFireStorage) {}

  ngOnInit() {}

  onFileChanged(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input) {
      this.selectedFile = input.files;
      this.currentFile = this.selectedFile!.item(0);
      if (this.currentFile) {
        const size = this.currentFile?.size / 1024 / 1024;
        console.log(size);
        if (size > 1) {
          this.message = 'please choose file less than 1 MB';
        }
      }
      this.loadFile();
    }
  }

  private loadFile(): void {
    let id = Math.random().toString(33).substring(2);
    if (this.name) {
      id = `${this.name.replace(' ', '_')}-${id}`;
    }
    this.ref = this.fireStorage.ref(id);

    (async () => {
      try {
        this.isLoading = true;
        const snapShort = await this.ref.put(this.currentFile);
        const getUrl = await snapShort.ref.getDownloadURL();
        const url = await getUrl;
        if (url) {
          this.isLoading = false;
          this.shareURL.emit(url);
        }
      } catch (error) {
        this.message = 'upload avatar fail please try again !';
      }
    })();
  }
}
