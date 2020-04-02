import { controller } from '@foal/core';

// Custom controllers
import {  OauthLoginController } from './controllers';

export class AppController {
  subControllers = [
    // controller('/api', FitterController),
    controller('/Oauth', OauthLoginController),
  ];
}
