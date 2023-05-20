import { configureStore, Action, combineReducers } from '@reduxjs/toolkit'
import thunk, { ThunkAction, ThunkDispatch, ThunkMiddleware } from 'redux-thunk'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import { IGoLensState, goLensReducer } from '../components/golens/GoLens.reducer'

export interface IAppReducerState {
  goLensState: IGoLensState
}

export const appReducer = combineReducers({
  goLensState: goLensReducer,
})

const rootReducer = (state: any, action: any): any => appReducer(state, action)

const middleware: any[] = [thunk as ThunkMiddleware<any>]

export const store = configureStore({
  middleware,
  reducer: rootReducer,
})

export type AppThunkDispatch = ThunkDispatch<IAppReducerState, any, Action<string>>

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
