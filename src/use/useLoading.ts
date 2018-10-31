import React from "react";


function loading() {
    const { useState } = (React as any);   
    const [isLoading, setLoading] = useState(false);

    return {
        isLoading,
        wrapperLoading: (func: any) => async () => {
            if(isLoading) {
                return;
            }
            try {
                setLoading(true);
                return await func();
            } finally {
                setLoading(false);
            }
        }
    }
}

export default loading;
