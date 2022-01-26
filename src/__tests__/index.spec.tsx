/** @jest-environment jsdom */

import Page from '../routes/__main/index';

describe('Home Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
