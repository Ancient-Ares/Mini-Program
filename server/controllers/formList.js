const {mysql: config} = require('../config')

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.pass,
        database: config.db,
        charset: config.char,
        multipleStatements: true
    }
})


async function getNewDate() {
    let Now = new Date()
    let Day = Now.getDate()
    let Month = Now.getMonth() + 1
    let Year = Now.getFullYear()
    let Hours = Now.getHours() < 10 ? '0' + Now.getHours() : Now.getHours()
    let Minutes = Now.getMinutes() 
    let Seconds = Now.getSeconds()
    let timeNow = `${Year}-${Month}-${Day} ${Hours}:${Minutes}:${Seconds}`
    return timeNow
}

async function postForm(userInfo) {
    let userName = userInfo.userName
    let userPhone = userInfo.userPhone
    let userAddress = userInfo.userAddress
    let userWords = userInfo.userWords || '请联系我！'
    let postTime = await getNewDate()

    let postAction = await knex('formlist')
        .insert({
            username: userName,
            posttime: postTime,
            useraddress: userAddress,
            userphone: userPhone,
            userwords: userWords
        })
        .catch(e => {
            throw new Error(`发生错误: ${e}`)
        })
    return postAction
}


async function getForm() {
    let getAction = await knex('formlist').orderBy('posttime', 'desc')
        .catch(e => {
            throw new Error(`发生错误: ${e}`)
        })
    return getAction
}


module.exports = {
    // get
    getForm: async ctx => {
        const formList = await getForm()
            .catch(e=>{
                throw new Error(e)
                return false
            })
        ctx.body = {
            code: 0,
            mgs: 'success!',
            data: formList
        }
        return
    },

    // post
    postForm: async ctx => {
        let res = ctx.request.body;
        if (!res.userName || !res.userPhone || !res.userAddress) {
            throw new Error('请检查信息是否填写完整！')
            return false
        }
        const userInfo = await postForm(res)
        ctx.body = {
            code: 0,
            mgs: 'success!'
        }
        return
    }
}
