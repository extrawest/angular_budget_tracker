import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword, onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword, signInWithPopup, signOut, UserCredential,
} from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AuthProvider, FacebookAuthProvider, GoogleAuthProvider, User } from 'firebase/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';

import { IUser } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public currentUser$: Observable<User | null>;

  private readonly currentUserSubject$ = new BehaviorSubject<User | null>(null);

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly auth: Auth,
  ) {
    this.currentUser$ = this.currentUserSubject$.asObservable();

    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject$.next(user);
    });
  }

  public login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  public register(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  public async signInWithGoogle(): Promise<User> {
    return this.signInWithPopup(new GoogleAuthProvider());
  }

  public async signInWithFacebook(): Promise<User> {
    return this.signInWithPopup(new FacebookAuthProvider());
  }

  public sendEmailVerification(user: User): Observable<void> {
    return from(sendEmailVerification(user));
  }

  public signOut(): Observable<void> {
    return from(signOut(this.auth));
  }

  private async signInWithPopup(provider: AuthProvider): Promise<User> {
    const { user } = await signInWithPopup(this.auth, provider);

    await this.setUserData(user);

    return user;
  }

  private async setUserData(user: User): Promise<void> {
    const userRef: AngularFirestoreDocument<IUser> = this.firestore.doc(`users/${user.uid}`);

    const userData: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    return userRef.set(userData, { merge: true });
  }
}
