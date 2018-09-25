import Vuex from 'vuex'
import vue from 'vue'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import createLogger from 'vuex/dist/logger'
vue.use(Vuex);

const logger = createLogger({
  collapsed: false, // 自动展开记录的 mutation
  filter(mutation, stateBefore, stateAfter) {
    // 若 mutation 需要被记录，就让它返回 true 即可 顺便，`mutation` 是个 { type, payload } 对象
    console.log('mutation:', mutation, 'stateBefore:', stateBefore, 'stateAfter:', stateAfter);
    return true
  },
  transformer(state) {
    // 在开始记录之前转换状态 例如，只返回指定的子树  state.addUser
    return state
  },
  mutationTransformer(mutation) {
    // mutation 按照 { type, payload } 格式记录 我们可以按任意方式格式化
    return mutation
  },
  logger: console, // 自定义 console 实现，默认为 `console`
});

const state = {addUser: []};

const store = new Vuex.Store({
  plugins: [logger],
  state,
  getters,
  mutations,
  actions
});
export default store
