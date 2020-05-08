import md5 from './md5.min.js'

const appid = '20200505000439362'
const key = '6Q7vgaIKb6iZccR8yS8H'

function translate(q, { from = 'auto', to = 'auto' } = { from: 'auto', to: 'auto' }) {
  return new Promise((resolve, reject) => {
    let salt = Date.now()
    let sign = md5(`${appid}${q}${salt}${key}`)
    wx.request({
      url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
      data: {
        q,
        from,
        to,
        appid,
        salt,
        sign
      },
      success(res) {
        console.log('success321',res);
        
        if (res.data && res.data.trans_result) {
          resolve(res.data)
        } else {
          reject({ status: 'error', msg: '翻译失败1' })
          wx.showToast({
            title: '翻译失败2',
            icon: 'none',
            duration: 3000
          })
        }
      },
      fail() {
        console.log('fail321');

        reject({ status: 'error', msg: '翻译失败3' })
        wx.showToast({
          title: '网络异常',
          icon: 'none',
          duration: 3000
        })
      }
    })
  })
}
module.exports.translate = translate