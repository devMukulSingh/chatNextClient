import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

// : () => AppDispatch: This specifies the type of the hook.
// It's a function that takes no arguments (() =>) and returns a value of type AppDispatch.
// In Redux, AppDispatch is typically the type of the dispatch function.
export const useAppDispatch: () => AppDispatch = useDispatch;

// <RootState> => generic parameter being passed to TypedUseSelectorHook.
//   RootState => is the type that represents the entire state of your Redux store.
//  It's a placeholder for whatever type you've defined for your Redux store state.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
