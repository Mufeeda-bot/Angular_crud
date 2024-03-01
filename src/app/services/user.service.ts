import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private _http: HttpClient) { } 

  GetAll(): Observable<any> {
    return this._http.get('http://localhost:3000/user');
  }
  
  Getbycode(code: any): Observable<any> {
    return this._http.get('http://localhost:3000/user/' + code);
  }
  
  proceedregister(inputdata: any): Observable<any> {
    return this._http.post('http://localhost:3000/user', inputdata);
  }
  
  Updateregisteration(code: any, inputdata: any): Observable<any> {
    return this._http.put('http://localhost:3000/user/' + code, inputdata);
  }
  
  IsloggedIn(): boolean {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('username') !== null;
    }
    return false;
  }
  
  GetUserrole(): string {
    if (typeof window !== 'undefined') {
      sessionStorage.getItem('userrole') !== null ? sessionStorage.getItem('userrole')?.toString() : '';
    }
    return '';
}

}
