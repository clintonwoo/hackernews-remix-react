/** @jest-environment jsdom */

import Page from '../routes/__main/jobs';

describe('Jobs Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
