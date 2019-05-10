
/*** ACTIONS ***/
export const types = {
  GET_COLOR_FORMULA_REQUEST: 'GET_COLOR_FORMULA_REQUEST',
  GET_COLOR_FORMULA_RESPONSE: 'GET_COLOR_FORMULA_RESPONSE',
  UPDATE_SEARCH_QUERY: 'UPDATE_SEARCH_QUERY',
  UPDATE_FORMULA_COLOR: 'UPDATE_FORMULA_COLOR',
};

// Action creators
const getColorFormulaRequest = () => ({ type: types.GET_COLOR_FORMULA_REQUEST });
const getColorFormulaResponse = (response, error = false) => {
  return { type: types.GET_COLOR_FORMULA_RESPONSE, payload: response, error };
};

export const actionCreators = {
  getColorFormulaRequest,
  getColorFormulaResponse,

  getColorFormula: async (dispatch, getState) => {
    dispatch(getColorFormulaRequest());

    try {
      // const response = await fetch('https://j3igzero-test.firebaseio.com/formula.json');
      const response = await fetch('https://www.bostonindustrialsolutions.com/convert-color-formula/');
      
      const responseJson = await response.json();
      const items = responseJson.data;
      // console.log(items);
      dispatch(getColorFormulaResponse(items));
    }
    catch (e) {
      dispatch(getColorFormulaResponse(e, true));
    }
  },
  updateSearchQuery: query => ({ type: types.UPDATE_SEARCH_QUERY, payload: query }),
  updateFormulaColor: pantone => ({ type: types.UPDATE_FORMULA_COLOR, payload: pantone }),
};

/*** REDUCERS ***/
const initialState = {
  loading: true,
  error: false,
  errorMessage: '',

  search: {
    currentQuery: '',
    dataTrending: [
      {title: 'PMS 348', count: 1299},
      {title: 'Silicone inks', count: 967},
      {title: 'Mixing ratios', count: 551},
    ],
  },
  formula: {
    currentColor: null,
    data: {},
  },
};

export const reducer = (state = initialState, action) => {
  let { search, formula } = state;
  const {type, payload, error} = action;

  switch (type) {
    case types.GET_COLOR_FORMULA_REQUEST: {
      return {...state, loading: true};
    }
    case types.GET_COLOR_FORMULA_RESPONSE: {
      if (error) {
        console.log('Cannot get color formula list!');
        console.log(payload);
        return {...state, loading: false, error, errorMessage: 'Cannot get color formula list!'};
      }
      // let pms_list = buildPMSList(payload);

      return {...state, 
        loading: false, 
        formula: {...formula, data: payload}
      };
    }
    case types.UPDATE_SEARCH_QUERY: {
      return {...state, search: {...search, currentQuery: payload}};
    }
    case types.UPDATE_FORMULA_COLOR: {
      return {...state, formula: {...formula, currentColor: payload}};
    }
  }

  return state;
};
