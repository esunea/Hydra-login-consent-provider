import { url } from "./Oauth_hydra.service"
import  * as https from 'http';

export class DomiiApi {
    public domiiApiUrl = "srvtest.tekin.fr" 
    
    checkToken(login,password){
        return new Promise(async (resolve)=>{
            
            // new URL
            let url = {
                path : '/api/login',
                host : this.domiiApiUrl,
                
                method : 'POST',
                port:3002
                
            }
            let result:any = await this.fetch(url,{
                email:login,
                password:password
            })
            // console.log(result["data"])
            resolve(result)
        })
        
    }
    
    
    fetch(url:url,body?){
        return new Promise (function (resolve, reject){
            console.log(body)
            let headers = {}
            if(body){
                headers = {
                    'Content-Type' : "application/json"
                }
            }
            let agentOptions = {
                rejectUnauthorized:false
            }
            // let agent = new https.Agent(agentOptions)
            
            const options = {
                // agent:agent,
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
                // console.log(error)
                resolve(undefined)
            })
            // console.log(body);
            if(body)
            req.write(JSON.stringify(body))
            req.end()
        })
    }
}
