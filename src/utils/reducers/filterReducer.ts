export function reducer(state: any, action: any) {
  switch (action.type) {
    case "POST_TYPE":
      return { ...state, postType: action.payload };
    case "POST_TIME":
      return { ...state, postTime: action.payload };
    case "VERIFIED":
      return {
        ...state,
        verified: action.payload,
      };
    case "CLEAR_ALL": //TODO - clear all filters
      return {
        postType: ["post", "reel", "story", "video"],
      };
    default:
      return state;
  }
}
