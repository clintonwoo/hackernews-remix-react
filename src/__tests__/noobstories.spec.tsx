/** @jest-environment jsdom */
import Page from '../routes/__main/noobstories';

describe('Noob Stories Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
