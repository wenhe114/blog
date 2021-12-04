import request  from "../service/index"

const state=()=>({
    menu:[{
        name:"wnehe"
    }],
    contentList:[],
    aboutInfo:{}
})

const getters={
    menu:(state)=>{
        return state.menu
    },
    aboutInfo:(state)=>{
        return state.aboutInfo
    }
}

const mutations={
    menuMutations:(state,val)=>{
        state.menu=val
    },
    aboutInfoMutations:(state,val)=>{
        state.aboutInfo=val
    }
}

const actions={
    menuActions:async (context, val)=>{
        context.commit("menuMutations",val)
    },
    aboutInfoActions:async (context, val)=>{
        context.commit("aboutInfoMutations",val)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
  }
  