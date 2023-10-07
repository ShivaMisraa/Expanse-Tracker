const TOGGLE_THEME = "TOGGLE_THEME";

const initialState = "light";
const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return state === "light" ? "dark" : "light";
    default:
      return state;
  }
};

export const toggleTheme = () => ({
  type: TOGGLE_THEME,
});

export default themeReducer;
