import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class CategoryService {
  public readonly form = new FormGroup({
    color: new FormControl(''),
    icon: new FormControl(''),
  });
}
