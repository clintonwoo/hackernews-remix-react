import React, { useState } from 'react';
import { ActionFunction, Form, redirect, Link, LoaderFunction, json, useSearchParams } from 'remix';

import { validateNewUser } from '../../utils/validation/user';
import {
  getErrorMessageForLoginErrorCode,
  UserLoginErrorCode,
} from '../../utils/user-login-error-code';
import { BlankLayout } from '../../layouts/blank-layout';
import { commitSession, getSession, SessionCookieProperties } from '../../cookies';
import { userService } from '../../server/bootstrap.server';
import { URLSearchParamFields } from '../../utils/http-handlers';
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERID_MAX_LENGTH,
  USERID_MIN_LENGTH,
} from '../../config';

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const data = { error: session.get('error') };

  return json(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

export const action: ActionFunction = async (req) => {
  const session = await getSession(req.request.headers.get('Cookie'));

  const formData = await req.request.formData();
  const id = formData.get('id') as string | null;
  const password = formData.get('password') as string | null;
  const goto = formData.get('goto') as string | null;

  const errors = {};
  if (!id) errors.id = true;
  if (!password) errors.password = true;
  if (Object.keys(errors).length > 0) {
    return json(errors);
  }

  const user = await userService.getUser(id as string);
  if (!user) {
    return redirect('/login?how=unsuccessful');
  }

  if (!(await userService.validatePassword(id as string, password as string))) {
    return redirect('/login?how=unsuccessful');
  }

  session.set(SessionCookieProperties.USER_ID, user.id);
  return redirect(goto || '/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

function LoginPage(): JSX.Element {
  const [searchParams] = useSearchParams();
  const how = searchParams.get(URLSearchParamFields.HOW) as UserLoginErrorCode | undefined;
  const goto = searchParams.get(URLSearchParamFields.GOTO);

  const message = how ? getErrorMessageForLoginErrorCode(how) : undefined;

  const [loginId, setLoginId] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [registerId, setRegisterId] = useState<string>('');
  const [registerPassword, setRegisterPassword] = useState<string>('');
  const [validationMessage, setValidationMessage] = useState<string>('');

  const validateLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    try {
      validateNewUser({ id: loginId, password: loginPassword });
    } catch (err: any) {
      e.preventDefault();
      setValidationMessage(err.message);
    }
  };

  const validateRegister = (e: React.FormEvent<HTMLFormElement>): void => {
    try {
      validateNewUser({ id: registerId, password: registerPassword });
    } catch (err: any) {
      e.preventDefault();
      setValidationMessage(err.message);
    }
  };

  return (
    <BlankLayout>
      {message && <p>{message}</p>}
      {validationMessage && <p>{validationMessage}</p>}
      <b>Login</b>
      <br />
      <br />
      <Form
        method="post"
        action="/login"
        onSubmit={(e): void => validateLogin(e)}
        style={{ marginBottom: '1em' }}
      >
        <input type="hidden" name="goto" value={goto || 'news'} />
        <table style={{ border: '0px' }}>
          <tbody>
            <tr>
              <td>username:</td>
              <td>
                <input
                  autoCapitalize="off"
                  autoCorrect="off"
                  name="id"
                  minLength={USERID_MIN_LENGTH}
                  maxLength={USERID_MAX_LENGTH}
                  onChange={(e): void => setLoginId(e.target.value)}
                  size={20}
                  spellCheck={false}
                  type="text"
                />
              </td>
            </tr>
            <tr>
              <td>password:</td>
              <td>
                <input
                  type="password"
                  name="password"
                  minLength={PASSWORD_MIN_LENGTH}
                  maxLength={PASSWORD_MAX_LENGTH}
                  onChange={(e): void => setLoginPassword(e.target.value)}
                  size={20}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <input type="submit" value="login" />
      </Form>
      <Link to="/forgot">Forgot your password?</Link>
      <br />
      <br />
      <b>Create Account</b>
      <br />
      <br />
      <Form
        method="post"
        action="/register"
        onSubmit={(e): void => validateRegister(e)}
        style={{ marginBottom: '1em' }}
      >
        <table style={{ border: '0px' }}>
          <tbody>
            <tr>
              <td>username:</td>
              <td>
                <input
                  type="text"
                  name="id"
                  minLength={USERID_MIN_LENGTH}
                  maxLength={USERID_MAX_LENGTH}
                  onChange={(e): void => setRegisterId(e.target.value)}
                  size={20}
                  autoCorrect="off"
                  spellCheck={false}
                  autoCapitalize="off"
                />
              </td>
            </tr>
            <tr>
              <td>password:</td>
              <td>
                <input
                  type="password"
                  name="password"
                  minLength={PASSWORD_MIN_LENGTH}
                  maxLength={PASSWORD_MAX_LENGTH}
                  onChange={(e): void => setRegisterPassword(e.target.value)}
                  size={20}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <input type="submit" value="create account" />
      </Form>
    </BlankLayout>
  );
}

export default LoginPage;
