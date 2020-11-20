const _ = require('lodash')
const fs = require('fs')
const path = require('path')

/**
 * 映射文件夹下的文件为模块
 */
const mapDir = d => {
    const tree = {}

    // 获得当前文件夹下的所有的文件夹和文件
    const [dirs, files] = _(fs.readdirSync(d))
        .partition(p => fs.statSync(path.join(d, p)).isDirectory())
    // _(value)
    // 创建一个经 lodash 包装后的对象会启用隐式链。返回的数组、集合、方法相互之间能够链式调用
    
    // 递归映射文件夹
    dirs.forEach(dir => {
        tree[dir] = mapDir(path.join(d, dir))
    })

    // 映射文件
    files.forEach(file => {
        if (path.extname(file) === '.js') {
            tree[path.basename(file, '.js')] = require(path.join(d, file))
        }
    })

    return tree
}

// 默认导出当前文件夹下的映射
module.exports = mapDir(path.join(__dirname))
