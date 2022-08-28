let rp = require('request-promise');

const URL =
  'https://stdportal.tdtu.edu.vn/Login/SignIn?ReturnURL=https://stdportal.tdtu.edu.vn/';

class School {
  constructor() {
    this.jar = rp.jar();

    rp = rp.defaults({
      headers: {
        'Cookie':
          '.AspNetCore.Session=CfDJ8FpX8nRFkhlOrWM5UpStYVdktqj28ED2QkevCYiaM8OLxa%2BzmbqfmsZJX%2BUu6o35juZavLqWYvSOVk%2B6FNIUq6DnV2Vk1VubhUCmAJtyYsZ6g3hxxeJx8AI5qZOb0ShGZ%2BeD3cCsslOlHXJP4jMhD3jBLSgO0hfz%2FdHNpbt55%2F1I; SL_G_WPT_TO=vi; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1; .AspNetCore.Antiforgery.ChIenfdnKrY=CfDJ8FpX8nRFkhlOrWM5UpStYVcW6a_pko1r_HZyam73PR-IDT0Mwwl40KE-7Pj0KikgCxPkpBrbr3vAoBM9ciFtxndaAmMu9dFuf52as0LB3wAawjiilHbMy1f28vIrXmJ8FWXblJfiRkigsGQFrpOPeO8; .AspNetCore.Cookies=CfDJ8FpX8nRFkhlOrWM5UpStYVcVitHtQmwYuZeMIc8zZpWl6BB_n86hwin6j0A3I2Xo2x7cAs_TyiKwy0GjVsQwDeFWUKlNipduZawCz4KVBMnDmBlq-Tnux5J50Fhja5nnTX6AhrctIuNhppPda_xkmoaauQzWcHpM_TbDfC_-a-n5gDJU9f58JPZ_RPZXED2mw34RP434G44FcSsR4Aov8EoeinvGDAUNkI2zsk_FrCpE9ziNfIEvKkKpsQZctQdXNU4FWsz7rIliOJlcjhrIovUHIfPOTM7owjc-k8XzJLwX3KMggPkdFuivovcVsMeiFDYklznNjNg3jgLe3kIf1G1AiH0bOmhekJGgIKmJnqrHtbGBgdbTVH4KG5xzChwjCs95AXvmh1d8cJKYdvB_wCmIRDz_kKZpUMgNN2mOMOqI_LYxlTt-tNooHLX40oiNQ0BwZa9OmoFSlsoHSCARJgFbuEyRi4-PjQ308W6ptG03y-BskQoe2TBEbs52pmyFE0bMbpTmqE3jd85_GzMhEiB3_Jh0So3qRbXz7jOvu7KJr3O95GTKr80OGRuCZrd7ppjqGNpjF59bvl2XEpZRMkcXFL1N8sd5FDBQd0lBYutu4u_eWV1ppFfunjcNUwEuwO4yWNkmiyxALjI-fXKrv95b5EGgeJgK7fwJU666lHjRrmEZclClGmwEWBPN7xZdroZx9DPVp9g-3TpHz2Jwxm6YIVDJFlltVVr_FBYf5Y8UkAZYnnCIyGe9t8ZPRGPH9BKIpUgRx0MbBbid4iWr3x2y1cEvuSllLpQ6DukYynxxXYH4fXn4BX2J3TWv_fVoo_YGKfwDj4u2-1AoFIuWGhz3Em1AnqUqlIIelUGCKymlJdvG4EJ3fzv2Ys1JP4RzmCgbSugsii2IXPk0a1Eh2wnJ4jz1VEAR_-Zvoz8ULKo5zlvySyM9dsMkClHiudEh3HfF59Qnp9Exrlpn_ZqWSe8Dip-PAv2D6Qks-4-_CSAlZu42WpOAWLOnqmshwSaj5KmKLmi_IBKDIHSREv23B6E36wk74n5wpzOKzxBgaWSCC2-UY8WjkasAa-BlzKOxfQ6gHwbS17T_G2HxrvuH9E_7xaXnc0obOGk2gMWv4a48fHq0Sb31zFD1Rflz9YJaUbqBIWjK5DQgMZYsAOJhXXAIFi4ndM9hu_wyuNik-APbgpvRVLCqbvAOLto9PR4DyPjzzfbkPQwQiOm_GcEuImJyWIa6wTzVDAj83BtZeICAvocZFRrE5kQ1myv8nilWQ7pqz5R1JhRm9eE4X2KYLYTZ-F70uSq3Fnew_ZRu3UhssqFvHBZAr14j83aptqzxeF_gZXVe59Ni0O6W07u1IyXM3jJeNyLO4BiQexw5ApUXaDbmn83JgY-ofxR7wcUdHeQu0qiNpqV42B-BfaA2B99n65SC6GX2ftXJPYt6tqhJp5sFvdwqBe8guIcswHGsbahlcuC0-34uh6q77FL22MRMjokdGDbln2ahy3WCSl3o',

        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
      },
      jar: this.jar,
    });
  }

  async login(user, pass) {
    var head = {
      Cookie:
        '.AspNetCore.Session=CfDJ8FpX8nRFkhlOrWM5UpStYVdktqj28ED2QkevCYiaM8OLxa%2BzmbqfmsZJX%2BUu6o35juZavLqWYvSOVk%2B6FNIUq6DnV2Vk1VubhUCmAJtyYsZ6g3hxxeJx8AI5qZOb0ShGZ%2BeD3cCsslOlHXJP4jMhD3jBLSgO0hfz%2FdHNpbt55%2F1I; SL_G_WPT_TO=vi; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1; .AspNetCore.Antiforgery.ChIenfdnKrY=CfDJ8FpX8nRFkhlOrWM5UpStYVcW6a_pko1r_HZyam73PR-IDT0Mwwl40KE-7Pj0KikgCxPkpBrbr3vAoBM9ciFtxndaAmMu9dFuf52as0LB3wAawjiilHbMy1f28vIrXmJ8FWXblJfiRkigsGQFrpOPeO8; .AspNetCore.Cookies=CfDJ8FpX8nRFkhlOrWM5UpStYVcVitHtQmwYuZeMIc8zZpWl6BB_n86hwin6j0A3I2Xo2x7cAs_TyiKwy0GjVsQwDeFWUKlNipduZawCz4KVBMnDmBlq-Tnux5J50Fhja5nnTX6AhrctIuNhppPda_xkmoaauQzWcHpM_TbDfC_-a-n5gDJU9f58JPZ_RPZXED2mw34RP434G44FcSsR4Aov8EoeinvGDAUNkI2zsk_FrCpE9ziNfIEvKkKpsQZctQdXNU4FWsz7rIliOJlcjhrIovUHIfPOTM7owjc-k8XzJLwX3KMggPkdFuivovcVsMeiFDYklznNjNg3jgLe3kIf1G1AiH0bOmhekJGgIKmJnqrHtbGBgdbTVH4KG5xzChwjCs95AXvmh1d8cJKYdvB_wCmIRDz_kKZpUMgNN2mOMOqI_LYxlTt-tNooHLX40oiNQ0BwZa9OmoFSlsoHSCARJgFbuEyRi4-PjQ308W6ptG03y-BskQoe2TBEbs52pmyFE0bMbpTmqE3jd85_GzMhEiB3_Jh0So3qRbXz7jOvu7KJr3O95GTKr80OGRuCZrd7ppjqGNpjF59bvl2XEpZRMkcXFL1N8sd5FDBQd0lBYutu4u_eWV1ppFfunjcNUwEuwO4yWNkmiyxALjI-fXKrv95b5EGgeJgK7fwJU666lHjRrmEZclClGmwEWBPN7xZdroZx9DPVp9g-3TpHz2Jwxm6YIVDJFlltVVr_FBYf5Y8UkAZYnnCIyGe9t8ZPRGPH9BKIpUgRx0MbBbid4iWr3x2y1cEvuSllLpQ6DukYynxxXYH4fXn4BX2J3TWv_fVoo_YGKfwDj4u2-1AoFIuWGhz3Em1AnqUqlIIelUGCKymlJdvG4EJ3fzv2Ys1JP4RzmCgbSugsii2IXPk0a1Eh2wnJ4jz1VEAR_-Zvoz8ULKo5zlvySyM9dsMkClHiudEh3HfF59Qnp9Exrlpn_ZqWSe8Dip-PAv2D6Qks-4-_CSAlZu42WpOAWLOnqmshwSaj5KmKLmi_IBKDIHSREv23B6E36wk74n5wpzOKzxBgaWSCC2-UY8WjkasAa-BlzKOxfQ6gHwbS17T_G2HxrvuH9E_7xaXnc0obOGk2gMWv4a48fHq0Sb31zFD1Rflz9YJaUbqBIWjK5DQgMZYsAOJhXXAIFi4ndM9hu_wyuNik-APbgpvRVLCqbvAOLto9PR4DyPjzzfbkPQwQiOm_GcEuImJyWIa6wTzVDAj83BtZeICAvocZFRrE5kQ1myv8nilWQ7pqz5R1JhRm9eE4X2KYLYTZ-F70uSq3Fnew_ZRu3UhssqFvHBZAr14j83aptqzxeF_gZXVe59Ni0O6W07u1IyXM3jJeNyLO4BiQexw5ApUXaDbmn83JgY-ofxR7wcUdHeQu0qiNpqV42B-BfaA2B99n65SC6GX2ftXJPYt6tqhJp5sFvdwqBe8guIcswHGsbahlcuC0-34uh6q77FL22MRMjokdGDbln2ahy3WCSl3o',
    };
    try {
      console.log('========== REQUEST ==========');
      console.time('Login');
      var dataString = 'user=52100852&pass=Trongtinh7727';
      const { url, result } = await rp({
        method: 'POST',
        headers: head,
        url: URL,
        body: dataString,
        json: true,
      });
      console.timeEnd('Login');
      console.log(result);
      if (result == 'fail') return false;

      // set cookie manually is much faster than redirect authentication
      const token = url.slice(url.indexOf('Token=') + 6);

      setAuthCookie(this.jar, token);

      return true;
    } catch (error) {
      console.log(error);
    }
  }
}

function setAuthCookie(jar, token) {
  const date = new Date(
    86400000 + 1000 * 60 * 30 + +new Date()
  ).toLocaleString();

  jar.setCookie(
    'AUTH_COOKIE=' + token + '|' + date + '; path=/',
    'http://sso.tdt.edu.vn/Authenticate.aspx'
  );
}

module.exports = School;
