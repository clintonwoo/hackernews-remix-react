/** @jest-environment jsdom */

import Page from '../routes/__blank/dmca';

describe('DMCA Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
