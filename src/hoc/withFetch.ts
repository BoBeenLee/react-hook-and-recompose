// tslint:disable-next-line:ordered-imports
import { compose, withState, withHandlers } from "recompose";
import withLoading from "./withLoading";

interface IFetchState {
    data: any[];
    next: string | null;
}

const INITIAL_STATE = {
    data: [],
    next: null,
}

const fetchAPI = async (uri: string, next?: string | null) => {
    const response = await fetch(next ? next : uri);
    return await response.json();
};

export default (uri: string) => compose(
    withLoading,
    withState("isRefresh", "setRefresh", false),
    withState<IFetchState, any, any, any>("fetchState", "setFetchState", INITIAL_STATE),
    withHandlers(
        {
            append: ({ fetchState: { data, next }, setFetchState, wrapperLoading }) => wrapperLoading(async () => {
                const response = await fetchAPI(uri, next);
                setFetchState({
                    data: [...data, ...response.results],
                    next: response.next
                });
            }),
            initialize: ({ setFetchState, wrapperLoading }) => wrapperLoading(async () => {
                const response = await fetchAPI(uri);
                setFetchState({
                    data: response.results,
                    next: response.next
                })
            }),
            refresh: ({ setFetchState, setRefresh, wrapperLoading }) => wrapperLoading(async () => {
                setRefresh(true);
                const response = await fetchAPI(uri);
                setRefresh(false);
                setFetchState({
                    data: response.results,
                    next: response.next
                })
            })
        }
    )
)
