const BASE_URL = "/blogApi"
export async function setStore(context) {
    const menuData = await context.$axios.get(BASE_URL + "/menu/list")
    const menu = responseData(menuData)
    context.store.dispatch("common/menuActions", menu);
    const aboutData = await context.$axios.get(BASE_URL + "/about")
    const about = responseData(aboutData)
    context.store.dispatch("common/aboutInfoActions", about)
    // return;
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
