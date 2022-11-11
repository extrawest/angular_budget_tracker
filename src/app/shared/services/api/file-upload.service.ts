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
  private readonly path = 'uploads';

  constructor(
    private readonly storage: Storage,
  ) {}

  upload(image: File): Observable<string> {
    return from(uploadBytes(ref(this.storage, this.path), image))
      .pipe(switchMap((result) => getDownloadURL(result.ref)));
  }
}
