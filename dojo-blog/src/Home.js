import { useState, useEffect } from 'react';
import BlogList from './BlogList';

const Home = () => {
    // create a reactive 'blogs' variable 
    const [blogs, setBlogs] = useState(null);

    // runs every render / fires on every render
    useEffect(() => {
        // is often used to fetch data or communicate with authentication service
        // do not change state inside this hook if state is inside the dependencies (the second argument),
        // because you will end up with INFINITE LOOP
        console.log('use effect ran');
        fetch('http://localhost:8000/blogs')
            .then(res => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setBlogs(data);
            })

    }, []);

    return (
        <div className="home">
            { blogs && <BlogList blogs={ blogs } />}
        </div>
    );
}
 
export default Home;