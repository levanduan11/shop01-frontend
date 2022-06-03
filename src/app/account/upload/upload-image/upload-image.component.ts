import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TokenService } from '../../../core/auth/token.service';
import { async } from '@angular/core/testing';
import {
  AngularFireStorage,
  AngularFireStorageReference,
} from '@angular/fire/compat/storage';
import { UploadServiceService } from './upload-service.service';
import { UploadImageUrl } from './upload.model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
})
export class UploadImageComponent implements OnInit {
  selectedFile!: FileList;
  currentFile!: File | null;
  ref!: AngularFireStorageReference;
  downloadURL!: string;
  checkUploadFile = false;
  isLoad = false;
  error_message = '';
  isUpLoadFile = false;
  uploadModel: UploadImageUrl = new UploadImageUrl();

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  upload_status_message = '';
  @Output()
  giveURL = new EventEmitter<string>();

  constructor(
    private afStorage: AngularFireStorage,
    private token: TokenService,
    private uploadService: UploadServiceService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  onFileChanged(event: any) {
    this.selectedFile = event.target.files;
    this.currentFile = this.selectedFile.item(0);
    this.isUpLoadFile = true;
  }

  onUpload() {
    this.checkUploadFile = true;

    const id2 = Math.random().toString(33).substring(2);
    this.ref = this.afStorage.ref(id2);
    (async () => {
      try {
        this.isLoad = true;
        const snapShort = await this.ref.put(this.currentFile);
        const v2 = await snapShort.ref.getDownloadURL();
        const urlDowLoad = await v2;
        if (urlDowLoad) {
          this.isLoad = false;
          this.downloadURL = urlDowLoad;
          this.giveURL.emit(this.downloadURL);
          this.isUpLoadFile = false;
        }
      } catch (error) {
        this.error_message = 'could not upload image !!!';
      }
    })();

    // this.ref
    //   .put(this.currentFile)
    //   .then((snapshort) => {
    //     return snapshort.ref.getDownloadURL();
    //   })
    //   .then((url) => {
    //     console.log(url);
    //   });
  }

  onUpdateImageUrl(): void {
    if (this.downloadURL) {
      this.uploadModel.imageUrl = this.downloadURL;
      this.uploadService.uploadImageUrl(this.uploadModel).subscribe({
        next: () => {
          this.upload_status_message = 'have been updated successfully';
          this.openSnackBar();
          window.location.reload();
        },
        error: () => {
          this.upload_status_message = 'upload fail !!!';
          this.openSnackBar();
        },
      });
    }
  }
  onPre(): void {
    window.history.back();
  }
  openSnackBar() {
    this._snackBar.open(this.upload_status_message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3 * 1000,
    });
  }
}
