import { combineReducers } from '@reduxjs/toolkit';

import courseReducer from '@/modules/course/courseSlice';

import appReducer from './appSlice';

const rootReducer = combineReducers({
  app: appReducer,
  course: courseReducer,
});

export default rootReducer;
