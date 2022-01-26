/** @jest-environment jsdom */

import Page from '../routes/__main/threads';

describe('Threads Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
