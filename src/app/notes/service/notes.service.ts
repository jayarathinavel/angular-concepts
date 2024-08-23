import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Notes} from "../model/notes";

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private notesApiUrl = environment.apiURL.concat("/api/notes/")

  constructor(private httpClient: HttpClient) {
  }

  public getAllNotes(): Observable<Notes[]> {
    return this.httpClient.get<Notes[]>(this.notesApiUrl.concat("all"));
  }

  public updateNotes(notes: Notes[]): Observable<any>{
    return this.httpClient.post<any>(this.notesApiUrl.concat("update"), notes);
  }
}
