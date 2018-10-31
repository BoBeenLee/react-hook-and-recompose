import { compose, withHandlers, withState } from "recompose";

export default compose(
    withState("isLoading", "setLoading", false),
    withHandlers({
        wrapperLoading: ({ setLoading, isLoading }) => (func: any) => async () => {
            if (isLoading) {
                return;
            }
            try {
                setLoading(true);
                return await func();
            } finally {
                setLoading(false);
            }
        }
    })
);
