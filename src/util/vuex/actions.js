//触发store中状态的改变,组件中调用action
const actions = {
  addUser(context, action) {
    context.commit('addUser', action.payLoad)
  },
  addUserCommit({commit}, action) {
    commit('addUser', action.payLoad)
  }
};
export default actions
