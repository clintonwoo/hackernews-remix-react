/** @jest-environment jsdom */

import Page from '../routes/__main/noobcomments';

describe('Noob Comments Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
