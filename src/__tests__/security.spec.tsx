/** @jest-environment jsdom */

import Page from '../routes/__notice/security';

describe('Security Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
