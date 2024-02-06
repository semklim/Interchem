import expireReducer from "./redux-persist-expires";
import { userInitialState } from "./user/userSlice";
import { cartInitialState } from "./cart/cartSlice";

const twoHours = 3600 * 2;
const sixMonth = 6 * 31 * 24 * 3600;

const defaultOption = {
  // (Optional) Key to be used for the time relative to which store is to be expired
  persistedAtKey: 'persistExpiresAt',
  // (Required) Seconds after which store will be expired
  expireSeconds: twoHours,
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
  expireSeconds: sixMonth,
});


export { cartExpire, userExpire }