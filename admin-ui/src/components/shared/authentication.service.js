/*import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    currentUserSubject :currentUserSubject,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};*/

export const authenticationService = {
    get currentUser () { return localStorage.getItem('currentUser') }
};