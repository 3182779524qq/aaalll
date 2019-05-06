const mutations = {
    addNum(state, i) {
        !i && (i = 1);
        state.num += i;
    },
}

export default mutations;