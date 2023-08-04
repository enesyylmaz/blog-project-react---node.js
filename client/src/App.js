import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useParams,
} from "react-router-dom";
import axios from "axios";
import "./style.css";
import BlogHeader from "./BlogHeader";
import BlogPost from "./BlogPost";
import AboutMe from "./AboutMe";
import Logo from "./images/logo.png";
import AddPost from "./AddPost";
import AdminLogin from "./AdminLogin";
import ClipLoader from "react-spinners/ClipLoader";

const URL = "https://newblogprojectbackend.onrender.com";

function App() {
  return (
    <div className="container mx-auto p-4">
      <header className="flex items-center justify-center mb-4">
        <div className="bg-white p-4 m-2 shadow-md rounded-md flex">
          <img src={Logo} alt="Logo" className="h-12 mr-4" />
          <nav>
            <NavLink to="/" activeClassName="activeButton">
              Home
            </NavLink>
            <NavLink to="/about" activeClassName="activeButton">
              About Me
            </NavLink>
          </nav>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/p/:id" element={<BlogPostPage />} />
        <Route path="/about" element={<AboutMe />} />
      </Routes>
    </div>
  );
}

function HomePage() {
  const [pages, setPages] = useState([]);
  const [loadedPages, setLoadedPages] = useState([]);
  const [limit, setLimit] = useState(3);
  const [loading, setLoading] = useState(true);
  const [moreDataAvailable, setMoreDataAvailable] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await axios.get(`${URL}/api/data`);
      setLoadedPages(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pages:", error);
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${URL}/api/data?offset=${loadedPages.length}`
      );
      setLoadedPages((prevLoadedPages) => [
        ...prevLoadedPages,
        ...response.data,
      ]);
      setMoreDataAvailable(response.data.length > 0);
    } catch (error) {
      console.error("Error fetching more pages:", error);
    }
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 justify-items-center gap-8">
      {loadedPages.map((page) => (
        <div key={page._id} className="w-1/2">
          <BlogHeader
            title={page.title}
            description={page.description}
            image={page.image}
            date={page.date}
            tags={page.tags}
            _id={page._id}
          />
        </div>
      ))}
      {!loading && moreDataAvailable && (
        <button
          className="mt-4 px-4 py-2 bg-white text-black rounded-md border border-black hover:bg-gray-200 focus:outline-none focus:ring focus:ring-blue-200"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      )}
      {loading && (
        <div className="flex items-center justify-center">
          <ClipLoader color="#000000" loading={loading} size={80} />
        </div>
      )}
    </div>
  );
}

function BlogPostPage() {
  const { id } = useParams();
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPostById(id);
  }, [id]);

  const fetchPostById = async (postId) => {
    setLoading(true);

    try {
      const response = await axios.get(`${URL}/api/data/${postId}`);
      setSelectedPost(response.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap justify-center">
      {loading ? (
        <div className="flex items-center justify-center">
          <ClipLoader color="#000000" loading={loading} size={80} />
        </div>
      ) : selectedPost ? (
        <BlogPost
          title={selectedPost.title}
          description={selectedPost.description}
          image={selectedPost.image}
          content={selectedPost.content}
          date={selectedPost.date}
        />
      ) : (
        <div>Post not found!</div>
      )}
    </div>
  );
}

function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  const activeStyle = {
    backgroundColor: "#222831",
    color: "#fff",
  };

  const normalStyle = {
    backgroundColor: "#4c596d",
    color: "#fff",
  };

  return (
    <Link
      to={to}
      className="inline-block py-2 px-4 rounded mx-2"
      style={isActive ? activeStyle : normalStyle}
    >
      {children}
    </Link>
  );
}

export default App;
