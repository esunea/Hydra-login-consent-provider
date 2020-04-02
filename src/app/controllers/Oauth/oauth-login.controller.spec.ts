// std
import { ok, strictEqual } from 'assert';

// 3p
import { Context, createController, getHttpMethod, getPath, isHttpResponseOK } from '@foal/core';

// App
import { OauthLoginController } from './oauth-login.controller';

describe('OauthLoginController', () => {

  let controller: OauthLoginController;

  beforeEach(() => controller = createController(OauthLoginController));

  describe('has a "foo" method that', () => {

    it('should handle requests at GET /.', () => {
      strictEqual(getHttpMethod(OauthLoginController, 'foo'), 'GET');
      strictEqual(getPath(OauthLoginController, 'foo'), '/');
    });

    it('should return an HttpResponseOK.', () => {
      const ctx = new Context({});
      ok(isHttpResponseOK(controller.foo(ctx)));
    });

  });

});
