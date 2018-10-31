import React from "react";

import useLoading from "./useLoading";

export default function fetch(fetchAPI: (next?: string | null) => Promise<any>) {
    const { useState } = (React as any);

    const [data, setData] = useState([]);
    const [next, setNext] = useState(null);
    const [isRefresh, setRefresh] = useState(false);

    const { isLoading, wrapperLoading } = useLoading();

    const append = async () => {
        const response = await fetchAPI(next);
        setData([...data, ...response.results]);
        setNext(response.next);
    }

    const initialize = async () => {
        const response = await fetchAPI();
        setData(response.results);
        setNext(response.next);
    }

    const refresh = async () => {
        setRefresh(true);
        const response = await fetchAPI();
        setData(response.results);
        setNext(response.next);
        setRefresh(false);
    }

    return {
        append: wrapperLoading(append),
        fetchState: {
            data,
            isLoading,
            isRefresh,
            next
        },
        initialize: wrapperLoading(initialize),
        refresh: wrapperLoading(refresh)
    }
}
