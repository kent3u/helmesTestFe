import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {InvolvementApplicationItem} from "../model/involvement-application-item";
import {InvolvementApplicationCreationRequest} from "../model/Involvement-application-creation-request";
import {InvolvementApplicationCreationResponse} from "../model/involvement-application-creation-response";
import {InvolvementApplicationChangeRequest} from "../model/involvement-application-change-request";

@Injectable({
  providedIn: 'root'
})
export class InvolvementApplicationRepository {

  protected url = 'rest/api/involvement-application'

  constructor(private http: HttpClient) {
  }

  getClientInvolvementApplicationItem(): Observable<InvolvementApplicationItem> {
    return this.http.get<InvolvementApplicationItem>(this.url);
  }

  createInvolvementApplication(applicationCreationRequest: InvolvementApplicationCreationRequest): Observable<InvolvementApplicationCreationResponse> {
    return this.http.post<InvolvementApplicationCreationResponse>(this.url, applicationCreationRequest);
  }

  changeInvolvementApplication(applicationId: string,
                               applicationChangeRequest: InvolvementApplicationChangeRequest): Observable<void> {
    return this.http.put<void>(`${this.url}/${applicationId}`, applicationChangeRequest);
  }
}
