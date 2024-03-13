import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginRepository {

  protected url = 'rest/api/login'

  constructor(private http: HttpClient) {
  }

  logIn(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.url}?username=${username}&password=${password}`, {}, {observe: "response"})
  }
}
