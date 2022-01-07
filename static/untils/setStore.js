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

// 获取资源列表
export async function getResourceList(context, type_id) {
    const contentData = await context.$axios.get(BASE_URL + "/resource/list?type_id="+type_id)
    const data = responseData(contentData)
    return data
}

// 获取资源分类列表
export async function getResourceTypeList(context, params) {
    const contentData = await context.$axios.get(BASE_URL + "/resourceType/list", {
        params: { ...params },
    })
    const data = responseData(contentData)
    return data
}

// 获取文章站点地图
export async function getContentSitemap(context) {
    const contentData = await context.$axios.get(BASE_URL + "/contents/sitemap")
    const data = responseData(contentData)
    console.log(data);
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
