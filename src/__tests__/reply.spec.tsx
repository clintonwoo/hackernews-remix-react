/** @jest-environment jsdom */

import Page from '../routes/__main/reply';

describe('Reply Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
