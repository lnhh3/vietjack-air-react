import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/stores';
import { NewCourseRequest } from '@/types/course';
import { getPropertyObject } from '@/utilities/helper';

type CourseState = {
  newCourseData: NewCourseRequest | null;
};

const initialCourse: CourseState = {
  newCourseData: null,
};

const courseSlice = createSlice({
  name: 'course',
  initialState: initialCourse,
  reducers: {
    setNewCourseData: (state, action: PayloadAction<NewCourseRequest | null>) => {
      state.newCourseData = action.payload;
    },
  },
});

const { reducer: courseReducer, actions } = courseSlice;

export const { setNewCourseData } = actions;

export const courseSelector = (state: RootState) => state.course || initialCourse;
export const selectNewCourseData = createSelector(courseSelector, (state) =>
  getPropertyObject(state, 'newCourseData')
);

export default courseReducer;
