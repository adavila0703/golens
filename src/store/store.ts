import { configureStore, Action, combineReducers } from '@reduxjs/toolkit'
import thunk, { ThunkAction, ThunkDispatch, ThunkMiddleware } from 'redux-thunk'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import {
  IGoLensState,
  goLensReducer,
} from '../components/golens/GoLens.reducer'
import {
  IPackageCoverageState,
  packageCoverageReducer,
} from '../components/packagecoverage/PackageCoverage.reducer'
import {
  IHtmlContentState,
  htmlContentReducer,
} from '../components/htmlcontent/HtmlContent.reducer'
import {
  IFileCoverageState,
  fileCoverageReducer,
} from '../components/filecoverage/FileCoverage.reducer'
import { ITasksState, tasksReducer } from '../components/tasks/Tasks.reducer'
import {
  IIgnoredDirectoriesState,
  ignoredDirectoriesReducer,
} from '../components/ignoreddirectories/IgnoredDirectories.reducer'

export interface IAppReducerState {
  goLensState: IGoLensState
  packageCoverageState: IPackageCoverageState
  htmlContentState: IHtmlContentState
  fileCoverageState: IFileCoverageState
  settingsState: ITasksState
  ignoredDirectoriesState: IIgnoredDirectoriesState
}

export const appReducer = combineReducers({
  goLensState: goLensReducer,
  packageCoverageState: packageCoverageReducer,
  htmlContentState: htmlContentReducer,
  fileCoverageState: fileCoverageReducer,
  settingsState: tasksReducer,
  ignoredDirectoriesState: ignoredDirectoriesReducer,
})

const rootReducer = (state: any, action: any): any => appReducer(state, action)

const middleware: any[] = [thunk as ThunkMiddleware<any>]

export const store = configureStore({
  middleware,
  reducer: rootReducer,
})

export type AppThunkDispatch = ThunkDispatch<
  IAppReducerState,
  any,
  Action<string>
>

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
