/* eslint-disable prefer-arrow-callback,func-names */

describe('vavilon.js test page', function () {
  it('loads', async function () {
    await browser.url('http://localhost:8099');

    expect(browser).toHaveTitleContaining('vavilon.js');
    expect(browser.getCookies('vavilon-locale')).toHaveLength(1);
  });
});
