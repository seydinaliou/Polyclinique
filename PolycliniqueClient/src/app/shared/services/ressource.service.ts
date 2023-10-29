import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Ressource } from "../model/ressource.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class RessourceService {

  endpoint: string = environment.apiUrl + "/roles";


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

  create(ressource: Ressource): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.endpoint, JSON.stringify(ressource), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  getById(id: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.endpoint + id)
      .pipe(catchError(this.errorHandler));
  }
  update(ressource: Ressource): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.endpoint, JSON.stringify(ressource), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  // delete(ressource: Ressource): Observable<any> {
  //   return this.httpClient.request("DELETE", this.endpoint, {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //        observe: "response",
  //     }),
  //     body: ressource,
  //   });
  // }
  delete(ressource: Ressource): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: ressource,
    };
    return this.httpClient.delete<any>(this.endpoint, httpOptions);
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
