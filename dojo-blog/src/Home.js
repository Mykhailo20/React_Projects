import { useState, useEffect } from 'react';
import BlogList from './BlogList';

const Home = () => {
    // create a reactive 'blogs' variable 
    const [blogs, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true);

    // runs every render / fires on every render
    useEffect(() => {
        // is often used to fetch data or communicate with authentication service
        // do not change state inside this hook if state is inside the dependencies (the second argument),
        // because you will end up with INFINITE LOOP
        setTimeout(() => {
            fetch('http://localhost:8000/blogs')
            .then(res => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setBlogs(data);
                setIsPending(false);
            })
        }, 1000); // setTimeout to simulate reading data from real db
    }, []);

    return (
        <div className="home">
            { isPending && <div>Loading...</div> }
            { blogs && <BlogList blogs={ blogs } title="All Blogs!"/>}
        </div>
    );
}
 
export default Home;