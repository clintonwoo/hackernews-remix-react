/** @jest-environment jsdom */

import Page from '../routes/__main/leaders';

describe('Leaders Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
