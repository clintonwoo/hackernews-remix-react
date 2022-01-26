/** @jest-environment jsdom */

import Page from '../routes/__main/lists';

describe('Lists Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
