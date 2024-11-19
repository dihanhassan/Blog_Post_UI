import { Action, select, Selector, State, StateContext, Store } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { UserLoginRequest, UserLoginResponse } from "../../shared/api-models";
import { ApiService } from "../../shared/services/api.service";
import { userAuthenticateAction } from "./user-authentication.action";
import { lastValueFrom } from "rxjs";
import { stat } from "fs";


export interface UserAuthenticateStateModel {
  userData: UserLoginResponse | null;
  isLogedIn: boolean;
}

@State<UserAuthenticateStateModel>
  (
      {
          name: 'userAuthenticate',
          defaults: {
              userData: null,
              isLogedIn: false
          }
      }
  )

  @Injectable()
export class UserAuthenticateState {
  @Selector()
  static isLogedIn (state : UserAuthenticateStateModel){
    return state.isLogedIn;
  }

  @Selector()
  static getToken (state : UserAuthenticateStateModel){
    return state.userData?.token;
  }
  static getRefreshToken (state : UserAuthenticateStateModel){
    return state.userData?.refreshToken;
  }

  constructor(private store : Store,private apiService : ApiService){}
  
  @Action(userAuthenticateAction.UserLogin)
  async setUserLoginData (ctx : StateContext<UserAuthenticateStateModel>, action : userAuthenticateAction.UserLogin){
    const state = ctx.getState();
    const res = await lastValueFrom(this.apiService.userLogin(action.email,action.password));
    if(res!=null){
      const userData : UserLoginResponse = {
        email: action.email,
        firstName: res.firstName,
        lastName: res.lastName,
        token: res.token,
        refreshToken: res.refreshToken
      }
      ctx.setState({
        ...state,
        userData: userData,
        isLogedIn: true
      });
    }
  }

  @Action(userAuthenticateAction.UpdateTokens)
  async updateTokens (ctx : StateContext<UserAuthenticateStateModel>,action: userAuthenticateAction.UpdateTokens){
    const state = ctx.getState();
    if(state.userData){
      const updateUserData : UserLoginResponse = {
        ...state.userData,
        token: action.token,
        refreshToken: action.refreshToken
      }
      ctx.patchState({
        userData: updateUserData
      });
    }
  }

  @Action(userAuthenticateAction.ClearResult)
  async clearUserData (ctx : StateContext<UserAuthenticateStateModel>,action : userAuthenticateAction.ClearResult){
    let state = ctx.getState();
    ctx.setState({
      ...state,
      userData: null,
      isLogedIn: false
    });
  }
}