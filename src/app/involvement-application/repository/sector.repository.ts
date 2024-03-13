import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sector} from "../model/sector";

@Injectable({
  providedIn: "root"
})
export class SectorRepository {

  protected url = 'rest/api/sectors'

  constructor(private http: HttpClient) {
  }

  findAllSectors(): Observable<Sector[]> {
    return this.http.get<Sector[]>(this.url);
  }
}
