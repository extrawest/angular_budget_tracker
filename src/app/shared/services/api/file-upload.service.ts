import { Injectable } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { from, Observable, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileUploadService {
  constructor(
    private readonly storage: Storage,
  ) {}

  upload(image: File, path: string): Observable<string> {
    return from(uploadBytes(ref(this.storage, path), image))
      .pipe(
        switchMap((result) => getDownloadURL(result.ref)),
      );
  }
}
