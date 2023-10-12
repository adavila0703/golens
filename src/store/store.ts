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
} from '../components/packagecoverage/PackageCoverage.reducer'
import {
  IHtmlContentState,
  htmlContentReducer,
} from '../components/htmlcontent/HtmlContent.reducer'
import {
  IFileCoverageState,
  fileCoverageReducer,
} from '../components/filecoverage/FileCoverage.reducer'
import {
  ISettingsState,
  settingsReducer,
} from '../components/settings/Settings.reducer'

export interface IAppReducerState {
  goLensState: IGoLensState
  repoDetailsState: IRepoDetailsState
  htmlContentState: IHtmlContentState
  fileCoverageState: IFileCoverageState
  settingsState: ISettingsState
}

export const appReducer = combineReducers({
  goLensState: goLensReducer,
  repoDetailsState: repoDetailsReducer,
  htmlContentState: htmlContentReducer,
  fileCoverageState: fileCoverageReducer,
  settingsState: settingsReducer,
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
