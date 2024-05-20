import { useState, useEffect } from "react";

const useFetch = (url) => {
    // create a reactive 'blogs' variable 
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    // runs every render / fires on every render
    useEffect(() => {
        // is often used to fetch data or communicate with authentication service
        // do not change state inside this hook if state is inside the dependencies (the second argument),
        // because you will end up with INFINITE LOOP
        setTimeout(() => {
            fetch(url)
                .then(res => {
                    if(!res.ok) {
                        throw Error('Could not fetch the data for the specified resource.');
                    }
                    return res.json();
                })
                .then((data) => {
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch(err => {
                    console.log("Fetch error happened: " + err.message);
                    setError(err.message);
                    setIsPending(false);  
                })
        }, 1000); // setTimeout to simulate reading data from real db
    }, [url]);

    return {data, isPending, error };
}

export default useFetch;