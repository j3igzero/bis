import { buildPMSList } from './func';

/*** ACTIONS ***/
export const types = {
  GET_COLOR_FORMULA_REQUEST: 'GET_COLOR_FORMULA_REQUEST',
  GET_COLOR_FORMULA_RESPONSE: 'GET_COLOR_FORMULA_RESPONSE',
  UPDATE_SEARCH_QUERY: 'UPDATE_SEARCH_QUERY',
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
      const response = await fetch('https://j3igzero-test.firebaseio.com/formula.json');
      const items = await response.data.json();
      dispatch(getColorFormulaResponse(items));
    }
    catch (e) {
      dispatch(getColorFormulaResponse(e, true));
    }
  },
  updateSearchQuery: query => ({ type: types.UPDATE_SEARCH_QUERY, payload: query }),

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
    data: {
      "123 C": [
        {"name": "310 White", "hex": "#FFFFFF", "percent": "18"},
        {"name": "aaa", "hex": "#FFFFFF", "percent": "78"},
        {"name": "aaa", "hex": "#FFFFFF", "percent": "4"}
      ],
      "348 C": [
        {"name": "aaa", "hex": "#FFFFFF", "percent": "2"},
        {"name": "aaa", "hex": "#FFFFFF", "percent": "3"},
        {"name": "aaa", "hex": "#FFFFFF", "percent": "90"},
        {"name": "aaa", "hex": "#FFFFFF", "percent": "5"}

      ],
      "201 C": [
        {"name": "aaa", "hex": "#FFFFFF", "percent": "86"},
        {"name": "aaa", "hex": "#FFFFFF", "percent": "14"}
      ]
    }
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
  }

  return state;
};
