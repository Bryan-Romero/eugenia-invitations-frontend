import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import authReducer from "../features/auth/authSlice";
import invitationsReducer from "../features/invitations/invitationsSlice";
import userReducer from "../features/user/userSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authReducer"],
};
const rootReducer = combineReducers({
  authReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    invitations: invitationsReducer,
    user: userReducer,
  },
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
