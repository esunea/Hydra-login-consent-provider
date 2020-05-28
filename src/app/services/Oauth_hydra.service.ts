/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */


import  * as https from 'https';
// import { AdvancedConsoleLogger } from 'typeorm';


export class Oauth_hydra {
    public hydraAdminUrl = "oauthadmin.domii-api.tekin.fr"

    // constructor(){
    //     const url = new URL('/oauth2/auth/requests/' + flow, hydraUrl)
    //     url.search = querystring.stringify({[flow + '_challenge']: challenge})
    //     console.log(url.toString()  )
    // }
    /**
    *
    * @param flow login or consent
    * @param challenge
    */

    getHydra(flow,challenge){
        return new Promise(async (resolve)=>{

            // new URL
            let url = {
                path : '/oauth2/auth/requests/' + flow + "?" + flow + "_challenge=" + challenge,
                host : this.hydraAdminUrl,
                method : 'GET',
                port:443

            }
            let result:any = await this.fetch(url)
            // console.log(result["data"])
            resolve(result)
        })

    }
    /**
    *
    * @param flow login or consent
    * @param action accept or reject
    * @param challenge
    * @param body
    */

    putHydra(flow, action, challenge, body){
        return new Promise(async (resolve)=>{
            console.log("put",challenge)
            let url = {
                path : '/oauth2/auth/requests/' + flow + "/" + action + "?" + flow + "_challenge=" + challenge,
                host : this.hydraAdminUrl,
                method : 'PUT',
                port:443
            }
            let result:any = await this.fetch(url,body)
            // console.log(result["data"])
            resolve(result)
        })
    }


    fetch(url:url,body?){
        return new Promise (function (resolve, reject){

            let headers = {}
            if(body){
                headers = {
                    'Content-Type' : "application/json"
                }
            }
            let agentOptions = {
                rejectUnauthorized:false
            }
            let agent = new https.Agent(agentOptions)

            const options = {
                agent:agent,
                hostname: url.host,
                port : url.port?url.port:'80',
                path: url.path,
                method: url.method,
                headers: headers
            }

            // process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

            const req = https.request(options, res =>{

                res.on('data', d=>{
                    resolve({res : res, data: d.toString()})
                })
            })
            req.on('error', error=>{
                console.log(error)
                resolve(undefined)
            })
            // console.log(body);
            if(body)
            req.write(JSON.stringify(body))
            req.end()
        })
    }
    getLogin(challenge){
        return this.getHydra('login',challenge)
    }

    acceptLogin(challenge,body){
        return this.putHydra('login','accept',challenge,body)

    }
    rejectLogin(challenge,body){
        return this.putHydra('login','reject',challenge,body)
    }
    getConsent(challenge){
        return this.getHydra('consent',challenge)
    }

    acceptConsent(challenge,body){
        return this.putHydra('consent','accept',challenge,body)

    }
    rejectConsent(challenge,body){
        return this.putHydra('consent','reject',challenge,body)
    }

}

export interface url{
    host:string,
    port?:number,
    path:string,
    method:string,
}
