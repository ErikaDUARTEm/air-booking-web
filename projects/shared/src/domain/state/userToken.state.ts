import { inject, Injectable } from "@angular/core";
import { StateFactory } from "./state.factory";
import { BehaviorSubject } from "rxjs";
import { IUserToken } from "../model/userToken.model";

@Injectable({
    providedIn: 'root',
  })
  export class UserTokenState {
    private readonly _factory = inject(StateFactory);
    private readonly userToken$ = new BehaviorSubject<IUserToken>(null);
    private readonly currenUserToken$ = new BehaviorSubject<IUserToken>(null);
  
    store() {
      return {
        userToken: this._factory.state(this.userToken$),
        currenUserToken: this._factory.state(this.currenUserToken$),
      };
    }
  }