/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

import { controller } from '@foal/core';

// Custom controllers
import {  OauthLoginController } from './controllers';

export class AppController {
  subControllers = [
    // controller('/api', FitterController),
    controller('/Oauth', OauthLoginController),
  ];
}
