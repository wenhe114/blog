
const BASE_URL = "/blogApi"
export const detailApi = (context) => {
    async function getContentDetail(id) {
        const data = await context.$axios.get(
            BASE_URL + "/content/detail/" + id
        );
        return responseData(data)
    }

    async function updateReadNum(id, read_num) {
        let params = {
            id: id,
            read_num: read_num,
        };
        const data = await context.$axios.put(BASE_URL + "/content/update/readNum", params)
        return responseData(data)
    }
    return {
        getContentDetail,
        updateReadNum
    }
}

export const contentListApi = (context) => {
    // 获取文章列表
     async function getContentList(params) {
        const contentData = await context.$axios.get(BASE_URL + "/contents/list", {
            params: { ...params },
        })
        const data = responseData(contentData)
        return data
    }

    return {
        getContentList
    }
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