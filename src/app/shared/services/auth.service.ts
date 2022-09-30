import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword, onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword, signInWithPopup, signOut,
} from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AuthProvider, FacebookAuthProvider, GoogleAuthProvider, User } from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';

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

  public async login(email: string, password: string): Promise<User> {
    const { user } = await signInWithEmailAndPassword(this.auth, email, password);

    return user;
  }

  public async register(email: string, password: string): Promise<User> {
    const { user } = await createUserWithEmailAndPassword(this.auth, email, password);

    this.sendEmailVerification(user);
    this.setUserData(user);

    return user;
  }

  public async signInWithGoogle(): Promise<User> {
    return this.signInWithPopup(new GoogleAuthProvider());
  }

  public async signInWithFacebook(): Promise<User> {
    return this.signInWithPopup(new FacebookAuthProvider());
  }

  public async sendEmailVerification(user: User): Promise<void> {
    return sendEmailVerification(user);
  }

  public async signOut(): Promise<void> {
    return signOut(this.auth);
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
