const BASE_URL = "/blogApi"
export async function setStore(context) {
    const menuData = context.$axios.get(BASE_URL + "/menu/list")
    const aboutData = context.$axios.get(BASE_URL + "/about")
    context.store.dispatch("common/menuActions", {name:"121212"});
    await  Promise.all([menuData, aboutData]).then(res => {
        const menu = responseData(res[0])
        context.store.dispatch("common/menuActions", menu);
        const about = responseData(res[1])
        context.store.dispatch("common/aboutInfoActions", about)
    })
}

// 获取文章列表
export async function getContentList(context, params) {
    const contentData = await context.$axios.get(BASE_URL + "/contents/list", {
        params: { ...params },
    })
    const data = responseData(contentData)
    return data
}

export function responseData(data) {
    if (!data) {
        throw new Error('Invalid Request.')
    }
    if (data.status === 200) {
        if (data.data.status === 1) {
            const result = data.data.data
            return result
        }
        return Promise.reject(data.data)
    } else {
        return Promise.reject(data.data)
    }
}
