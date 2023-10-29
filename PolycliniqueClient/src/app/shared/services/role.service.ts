import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Role } from "../model/role.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class RoleService {
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

  // getRoles(): Observable<Role>{
  //   let headers = new Headers();
  //   //headers.append('Authorization', this.authToken);
  //   headers.append('Content-Type', 'application/json');
  //   return this.httpClient.get(this.baseUrl, {headers: headers})
  //   .map(res => res.json());
  // }

  getRoleById(id: number): Observable<HttpResponse<any>> {
    return this.httpClient.get<any>(this.endpoint + id)
      .pipe(catchError(this.errorHandler));
  }

  create(role: Role): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(this.endpoint, JSON.stringify(role), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  createWithPrivileges(role: Role, privileges: Array<string>): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(this.endpoint + '/' + privileges, JSON.stringify(role), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  update(role: Role): Observable<HttpResponse<any>> {
    return this.httpClient.put<any>(this.endpoint, JSON.stringify(role), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  } 

  updateWithPrivilege(role: Role, privileges: Array<string>): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.endpoint + '/' + privileges, JSON.stringify(role), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  delete(role: Role): Observable<any> {
    return this.httpClient.request("DELETE", this.endpoint, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
         observe: "response",
      }),
      body: role,
    });
  }
  // delete(role: Role, id: number): Observable<HttpResponse<any>> {
  //   const httpOptions = {
  //     headers: this.httpOptions.headers,
  //     body: role,
  //   };
  //   return this.httpClient.delete<any>(this.endpoint + '/' +id, httpOptions);
  // }

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
