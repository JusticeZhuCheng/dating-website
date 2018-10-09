import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MemberService {

  private _membersUrl = "http://13.236.86.229:3000/api/members"

  constructor(private http:HttpClient) { }

  getMembers(){
    return this.http.get<any>(this._membersUrl)
  }
}
