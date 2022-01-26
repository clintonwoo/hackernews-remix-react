/** @jest-environment jsdom */

import Page from '../routes/__main/user';

describe('User Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
