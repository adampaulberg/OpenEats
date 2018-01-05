import SearchConstants from '../constants/SearchConstants'

function search(state = [], action) {
  switch (action.type) {
    case SearchConstants.BROWSE_SEARCH_LOAD:
      let newSearch = {};
      newSearch[action.qs] = {
        recipes: action.res.results,
        totalRecipes: action.res.count
      };

      return {
        ...state,
        ...newSearch
      };
    default:
      return state;
  }
}

export default search
