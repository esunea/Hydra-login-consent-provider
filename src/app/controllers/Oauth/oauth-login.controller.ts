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
    let result:any = await this.hydra.getHydra('login',challenge);
    if(result){
      if(result['data'] && result['data']['skip']) {
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
      return new HttpResponseInternalServerError('result is undefined');
    }
    // return new HttpResponseOK(result["data"]);
  }

  @Post('/loginResp')
  async putLogin(ctx) {
    let response:any ={};
    let challenge = ctx.request.body.challenge;

    let result :any = await this.domiiApi.checkToken(ctx.request.body.login, ctx.request.body.pass)
    if(result && result.data){
      // console.log(result.data)


      response = await this.hydra.acceptLogin(ctx.request.body.challenge,{
        subject:this.hashCode(result['data']['subject'],
      })
      if(response){
        if(response['data']) {
          console.log(JSON.parse(response['data'])['redirect_to'])
          return new HttpResponseRedirect(JSON.parse(response['data'])['redirect_to']);
        }
      }
    }

    return render('./templates/login.html', {
      challenge,
      title: 'Home',
    });

  }

  @Get('/consent')
  async getConsent(ctx:Context){
    let challenge = ctx.request.query.consent_challenge
    let result:any = await this.hydra.getConsent(challenge);
    if(result){
      if(result['data'] && result['data']['skip']){
        let accept = await this.hydra.acceptConsent(challenge,{
          subject:this.hashCode(result['data']['subject']),
          // remember:true,
          // remember_for:3600
        })
      }
      // let resp = {link: "http://box2.tekin.fr/Oauth/loginResp"}
      // return render('./templates/consent.html', {
      //   challenge: challenge,
      //   title: 'Home',
      // });
      console.log(challenge)
      let response: any = await this.hydra.acceptConsent(challenge,{
        subject:ctx.request.body.login,
        grant_scope:['offline']
      })
      // }
      if(response) {
        if(response['data']) {
          console.log("url")
          console.log(JSON.parse(response['data'])['redirect_to'])
          return new HttpResponseRedirect(JSON.parse(response['data'])['redirect_to']);
        }
      } return new HttpResponseOK('It\'s not Okay');

    } else {
      return new HttpResponseInternalServerError('result is undefined')
    }
    // return new HttpResponseOK(result["data"])
  }

  @Post('/consentResp')
  async putConsent(ctx){
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
    //   if(response['data']){
    //     return new HttpResponseRedirect(JSON.parse(response['data'])['redirect_to'])
    //   }
    // }


    return new HttpResponseOK(response['data'])
  }

 hashCode (value) {
    var hash = 0;
    if (value.length == 0) {
      return hash;
    }
    for (var i = 0; i < value.length; i++) {
      var char = value.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }

}
