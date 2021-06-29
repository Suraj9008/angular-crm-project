import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';
import { JwtInterceptor } from '../_helpers';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`/users/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
// export class AuthenticationService {
//     private currentUserSubject: BehaviorSubject<User>;
//     public currentUser: Observable<User>;
// USER:any;
//     constructor(private http: HttpClient) {
//         this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
//         this.currentUser = this.currentUserSubject.asObservable();
//     }

//     public get currentUserValue(): User {
//         return this.currentUserSubject.value;
//     }

//     login(username: string, password: string) {
//     if(username=='admin'&&password=='admin123'){
//         this.USER={ id: 2323,
//             username:"admin",
//             firstName: "suraj",
//             lastName: "narule",
//             token: 'fake-jwt-token'}
//     }
         
//             // login successful if there's a jwt token in the response
//             if (this.USER && this.USER.token) {
//                 // store user details and jwt token in local storage to keep user logged in between page refreshes
//                 localStorage.setItem('currentUser', JSON.stringify(this.USER));
//                 this.currentUserSubject.next(this.USER);
//             }

//             return this.currentUser;
            
//     }

//     logout() {
//         // remove user from local storage to log user out
//         localStorage.removeItem('currentUser');
//         this.currentUserSubject.next(null);
//     }
// }