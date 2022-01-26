/** @jest-environment jsdom */

import Page from '../routes/__blank/login';

describe('Login Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
