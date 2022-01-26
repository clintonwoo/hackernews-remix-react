/** @jest-environment jsdom */

import Page from '../routes/__main/formatdoc';

describe('Format Doc Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
