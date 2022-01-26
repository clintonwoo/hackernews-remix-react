/** @jest-environment jsdom */

import Page from '../routes/__main/bestcomments';

describe('Best Comments Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
