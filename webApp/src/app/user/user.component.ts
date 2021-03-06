import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../user-info.service';
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from '../user/user-info/user-info';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private _userInfoService: UserInfoService, private _routerInfo: ActivatedRoute) { }

  userInfo = new UserInfo()

  ngOnInit() {
    //Pass user id through routing parameters
    //Get user detail by userId
    this._routerInfo.params.subscribe(
      params => {
        this._userInfoService.getUser(params.id)
          .subscribe(
            res => this.userInfo = res,
            err => console.log(err)
          )
      }
    )
  }

}
