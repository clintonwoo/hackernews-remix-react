/** @jest-environment jsdom */

import Page from '../routes/__main/newpoll';

describe('New Poll Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
