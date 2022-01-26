/** @jest-environment jsdom */

import Page from '../routes/__main/changepw';

describe('Change Password Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
