/** @jest-environment jsdom */

import Page from '../routes/__notice/newsguidelines';

describe('Guidelines Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
