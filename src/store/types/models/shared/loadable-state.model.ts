/**Represents state which needs to be loaded. */
export interface LoadableState<T> {
    /** True if the data is loading. */
    loading: boolean
    /** The data, if loaded successfully. */
    data: T
    /** The error message, if loaded unsuccessfully. */
    error?: string
}

/** Returns the default loadable state(not loading, no data, no errors.) */
export function defaultLoadableState(): LoadableState<any> {
    return {
        loading: false,
        data: null
    }
}

/** Returns a loadable state with the loading flag set to true. */
export function loadingState(): LoadableState<any> {
    return {
        loading: true,
        data: null,
        error: undefined
    }
}

/** Returns a loadable state with an error. */
export function errorState(error: string, data: any = null): LoadableState<any> {
    return {
        loading: false,
        data,
        error
    }
}

/** Returns the loaded state with the loading flag set to false and the loaded data. */
export function dataLoadedState<T>(data: T): LoadableState<T> {
    return {
        loading: false,
        data
    }
}

/** Returns a loadable state with the loading flag set to true. */
export function dataRefreshingState<T>(data: T): LoadableState<T> {
    return {
        loading: true,
        data
    }
}

/**
 * Helper function to wrap different object in different loading states
 * @param object Object that you want to wrap all the values of
 * @param wrappedState wrapper state that you want to wrap each value with
 * @param overwritePayload if you want to overwrite the contents of the wrapper use this
 * @returns object where each value is wrapped in the wrapper function
 */
 export function wrapAllValues<T, J = T>(
    object: Record<string, LoadableState<T>>,
    wrappedState: (obj: T | any) => LoadableState<J>,
    overwritePayload?: any,
  ) {
    const newObject: Record<string, LoadableState<J>> = {}
  
    for (const key in object) {
      if (object[key]) {
        newObject[key] = wrappedState(overwritePayload || object[key].data)
      }
    }
  
    return newObject
  }
  