// PostCss 配置文件
const pxtorem = require('postcss-pxtorem')
module.exports = {
  //  配置要使用的  PostCss  插件
  plugins: [
    pxtorem({
      // 根节点字体大小
      // 如果是 vant 37.5 如果自己的代码 75
      //  file 当前编译的css文件路径
      rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 75),
      // 所有任意属性都转成rem
      propList: ['*']
    })
  ]
}
