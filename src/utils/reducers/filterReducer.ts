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
    case "USAGE_RIGHT":
      return {
        ...state,
        usageRight: action.payload,
      };
    case "CONTENT_TYPE":
      return {
        ...state,
        contentType: action.payload,
      };
    case "POST_DATE_RANGE":
      return {
        ...state,
        postDateRange: action.payload,
      };
    case "USER_NAMES":
      return {
        ...state,
        userNames: action.payload,
      };
    case "UNIQUE_IDS":
      return {
        ...state,
        uniqueIds: action.payload,
      };
    case "COLLECTIONS_INCLUDE": {
      let collections = [
        ...state.collectionInclude,
        ...state.collectionExclude,
      ];
      let collectionExclude = collections.filter((i: string) => {
        return !action.payload.includes(i);
      });
      return {
        ...state,
        collectionExclude,
        collectionInclude: action.payload,
      };
    }
    case "COLLECTIONS_EXCLUDE": {
      let collections = [
        ...state.collectionInclude,
        ...state.collectionExclude,
      ];
      let collectionInclude = collections.filter((i: string) => {
        return !action.payload.includes(i);
      });
      return {
        ...state,
        collectionInclude,
        collectionExclude: action.payload,
      };
    }
    case "CLEAR_ALL": //TODO - clear all filters
      return {
        ...state.initialState,
        initialState: {
          ...state.initialState,
        },
      };
    default:
      return state;
  }
}
