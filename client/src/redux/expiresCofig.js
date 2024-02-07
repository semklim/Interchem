import expireReducer from "./redux-persist-expires";
import { userInitialState } from "./user/userSlice";
import { cartInitialState } from "./cart/cartSlice";

const fiveMinutes = 60 * 5;
const oneWeek = 7 * 24 * 3600;

const defaultOption = {
  // (Optional) Key to be used for the time relative to which store is to be expired
  persistedAtKey: 'persistExpiresAt',
  // (Required) Seconds after which store will be expired
  expireSeconds: fiveMinutes,
  // (Optional) State to be used for resetting e.g. provide initial reducer state
  expiredState: {},
  // (Optional) Use it if you don't want to manually set the time in the reducer i.e. at `persistedAtKey` 
  // and want the store to  be automatically expired if the record is not updated in the `expireSeconds` time
  autoExpire: true
}

const cartExpire = expireReducer('cart', {
  ...defaultOption,
  expiredState: cartInitialState
});

const userExpire = expireReducer('user', {
  ...defaultOption,
  expiredState: userInitialState,
  expireSeconds: oneWeek,
});


export { cartExpire, userExpire }