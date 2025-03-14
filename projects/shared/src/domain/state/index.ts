import { inject, Injectable } from "@angular/core";
import { UserTokenState } from "./userToken.state";

@Injectable({
    providedIn: 'root',
  })
  export class State {
    private readonly _userToken = inject(UserTokenState);
  
    get userTokenState() {
      return this._userToken.store();
    }
  }