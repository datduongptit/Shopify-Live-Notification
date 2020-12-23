function getDefaultItems() {
  if (window) {
    const { search } = window.location;
    const searchParams = new URLSearchParams(search);
    if (searchParams.has("shop")) {
      const shopParams = searchParams.get("shop");
      return shopParams;
    }
  }
}
const initialState = {
  shop: getDefaultItems(),
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_URL":
      return { ...state, shop: action.data };

    default:
      return state;
  }
}
