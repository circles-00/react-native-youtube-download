const initialState = {
  dummy: {}
}

const decoyReducer = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return { ...state }
  }
}

export default decoyReducer
