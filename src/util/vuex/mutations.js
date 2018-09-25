//更改store中的状态
const mutations={
  addUser(state, payload) {
    // 变更状态
    this.state.addUser.push(payload)
  }
};
export default mutations
