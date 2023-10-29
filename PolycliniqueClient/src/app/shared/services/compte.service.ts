import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Compte } from "../model/compte.model";
import { environment } from "../../../environments/environment";


@Injectable({
  providedIn: "root",
})
export class CompteService {

  endpoint: string = environment.apiUrl + "/comptes";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(private httpClient: HttpClient) {}
  getAll(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.endpoint, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  getAgensWithoutCompte(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(environment.apiUrl +"/agents/sansCompte", {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  
  create(compte: Compte): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.endpoint+ "/" +compte.agent.id, JSON.stringify(compte), {
        headers: this.httpOptions.headers,
        observe: "response",
      });
  }
  getById(id: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.endpoint + id)
      .pipe(catchError(this.errorHandler));
  }
  
  getByUsername(username: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.endpoint + '/username/' + username, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  update(compte: Compte): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.endpoint, JSON.stringify(compte), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
      this.getAll();
  }
  
  updateMany(comptes: Compte[]): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.endpoint + '/many', JSON.stringify(comptes), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  updateWithNewPassword(compte: Compte, oldPassword: string, newPassword: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.endpoint + '/' + oldPassword +'/'+ newPassword, JSON.stringify(compte), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
  }

  delete(compte: Compte): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: compte,
    };
    return this.httpClient.delete<any>(this.endpoint+ "/" +compte.id, httpOptions);
  }

  errorHandler(error: any) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
