import { Injectable } from '@angular/core';
import { updateProfile } from '@angular/fire/auth';
import { User } from 'firebase/auth';
import { BehaviorSubject, filter, Observable, switchMap, take } from 'rxjs';

import { isNotNullOrUndefined } from '../../helpers/not-null-or-undefined';

@Injectable({ providedIn: 'root' })
export class UserService {
  public currentUser$: Observable<User>;

  private readonly currentUserSubject$ = new BehaviorSubject<User | null>(null);

  constructor() {
    this.currentUser$ = this.currentUserSubject$.asObservable().pipe(filter(isNotNullOrUndefined));
  }

  public setUser(user: User): void {
    this.currentUserSubject$.next(user);
  }

  public updateUserInfo(displayName: string): Observable<void> {
    return this.currentUser$.pipe(
      take(1),
      switchMap((user) => updateProfile(user, { displayName })),
    );
  }

  public updateUserPhoto(photoURL: string): Observable<void> {
    return this.currentUser$.pipe(
      take(1),
      switchMap((user) => updateProfile(user, { photoURL })),
    );
  }
}
