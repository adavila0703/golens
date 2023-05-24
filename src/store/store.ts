import { configureStore, Action, combineReducers } from '@reduxjs/toolkit'
import thunk, { ThunkAction, ThunkDispatch, ThunkMiddleware } from 'redux-thunk'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import {
  IGoLensState,
  goLensReducer,
} from '../components/golens/GoLens.reducer'
import {
  IRepoDetailsState,
  repoDetailsReducer,
} from '../components/package_coverage/PackageCoverage.reducer'
import {
  IHtmlContentState,
  htmlContentReducer,
} from '../components/html_content/HtmlContent.reducer'
import {
  IFileCoverageState,
  fileCoverageReducer,
} from '../components/file_coverage/FileCoverage.reducer'

export interface IAppReducerState {
  goLensState: IGoLensState
  repoDetailsState: IRepoDetailsState
  htmlContentState: IHtmlContentState
  fileCoverageState: IFileCoverageState
}

export const appReducer = combineReducers({
  goLensState: goLensReducer,
  repoDetailsState: repoDetailsReducer,
  htmlContentState: htmlContentReducer,
  fileCoverageState: fileCoverageReducer,
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
