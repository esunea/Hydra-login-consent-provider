/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */

import { Context, Get, HttpResponseOK, dependency, render, Post, HttpResponseInternalServerError, HttpResponseRedirect } from '@foal/core';
import { Oauth_hydra, DomiiApi } from '../../services';

export class OauthLoginController {
  @dependency
  hydra:Oauth_hydra
  @dependency
  domiiApi : DomiiApi

  @Get('/')
  foo(ctx: Context) {
    return new HttpResponseOK();
  }

  @Get('/login')
  async getLogin(ctx:Context){
    let challenge = ctx.request.query.login_challenge
    console.log('challenge : ',challenge);
    let result:any = await this.hydra.getHydra('login',challenge);
    if(result){
      console.log(result['data'])
      if(result['data'] && result['data']['skip']) {
        console.log('accept')
        let accept = await this.hydra.acceptLogin(challenge, {
          subject:result['data']['subject'],
          // remember:true,
          // remember_for:3600
        });
      }

      // let resp = {link: "http://box2.tekin.fr/Oauth/loginResp"}
      return render('./templates/login.html', {
        challenge,
        title: 'Home',
        error: 'hide',
      });
    } else {
      console.log('result is undefined');
      return new HttpResponseInternalServerError('result is undefined');
    }
    // return new HttpResponseOK(result["data"]);
  }

  @Post('/loginResp')
  async putLogin(ctx) {
    console.log(ctx.request.body);
    let response:any ={};
    let challenge = ctx.request.body.challenge;
    
    let result :any = await this.domiiApi.checkToken(ctx.request.body.login, ctx.request.body.pass)
    // console.log(result.res)

    console.log(result.data)
    if(result.data){
      
    }
    
    if(ctx.request.body.login === 'no'){
      //response = await this.hydra.rejectLogin(ctx.request.body.challenge,{error : 'login rejected',error_description:'no !'})
      return render('./templates/login.html', {
        challenge,
        title: 'Home',
      });

    }else if(ctx.request.body.login === 'save'){
      response = await this.hydra.acceptLogin(ctx.request.body.challenge,{
        subject:ctx.request.body.login,
        remember:true,
        remember_for:3600
      })
    }else{
      // console.log(ctx.request.body.login)
      response = await this.hydra.acceptLogin(ctx.request.body.challenge,{
        subject:ctx.request.body.login,
      })
    }
    if(response){
      console.log(response['data']);
      if(response['data']) {
        console.log(JSON.parse(response['data'])['redirect_to']);
        return new HttpResponseRedirect(JSON.parse(response['data'])['redirect_to']);
      }
    }

    return new HttpResponseOK(response['data']);
  }

  @Get('/consent')
  async getConsent(ctx:Context){
    let challenge = ctx.request.query.consent_challenge
    console.log('challenge : ',challenge);
    let result:any = await this.hydra.getConsent(challenge);
    if(result){
      console.log(result['data'])
      if(result['data'] && result['data']['skip']){
        console.log('accept');
        let accept = await this.hydra.acceptConsent(challenge,{
          subject:result['data']['subject'],
          // remember:true,
          // remember_for:3600
        })
      }
      // let resp = {link: "http://box2.tekin.fr/Oauth/loginResp"}
      // return render('./templates/consent.html', {
      //   challenge: challenge,
      //   title: 'Home',
      // });
      let response: any = await this.hydra.acceptConsent(ctx.request.body.challenge,{
        subject:ctx.request.body.login,
        grant_scope:['offline']
      })
      // }
      if(response) {
        console.log(response['data'])
        if(response['data']) {
          return new HttpResponseRedirect(JSON.parse(response['data'])['redirect_to']);
        }
      } return new HttpResponseOK('It\'s not Okay');

    } else {
      console.log('result is undefined')
      return new HttpResponseInternalServerError('result is undefined')
    }
    // return new HttpResponseOK(result["data"])
  }

  @Post('/consentResp')
  async putConsent(ctx){
    // console.log(ctx.request.body)
    let response:any ={}
    // if(ctx.request.body.login === "no"){
    //   response = await this.hydra.rejectConsent(ctx.request.body.challenge,{error : "login rejected",error_description:"no !"})
    // }else if(ctx.request.body.login === "save"){
    //   response = await this.hydra.acceptConsent(ctx.request.body.challenge,{
    //     subject:ctx.request.body.login,
    //     remember:true,
    //     remember_for:3600
    //   })
    // }else{
      console.log('yop',ctx.request.body.openid)//offline
      console.log('plop',ctx.request.body.offline)//offline

      let grant_scope:Array<string> = []
      if(ctx.request.body.openid =='on'){
        grant_scope.push('openid')
      }
      if(ctx.request.body.offline =='on'){
        grant_scope.push('offline')
      }

    //   response = await this.hydra.acceptConsent(ctx.request.body.challenge,{
    //     subject:ctx.request.body.login,
    //     grant_scope:grant_scope
    //   })
    // // }
    // if(response){
    //   console.log(response['data'])
    //   if(response['data']){
    //     return new HttpResponseRedirect(JSON.parse(response['data'])['redirect_to'])
    //   }
    // }


    return new HttpResponseOK(response['data'])
  }

}
