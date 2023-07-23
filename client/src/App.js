import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useLocation,
} from "react-router-dom";
import "./style.css";
import BlogHeader from "./BlogHeader";
import BlogPost from "./BlogPost";
import AboutMe from "./AboutMe";
import Logo from "./images/logo.png";

const URL = "https://newblogprojectbackend.onrender.com";

function App() {
  const pages = [
    {
      id: 1,
      title: "Blog Page 1",
      description: "This is the description for Blog Page 1.",
      imageUrl:
        "https://i.kym-cdn.com/photos/images/original/002/271/481/214.png",
      content: "This is the full content of Blog Page 2.",
    },
    {
      id: 2,
      title: "Blog Page 2",
      description: "This is the description for Blog Page 2.",
      imageUrl: "https://via.placeholder.com/200",
      content: "This is the full content of Blog Page 2.",
    },
  ];

  return (
    <Router>
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
          <Route path="/" element={<HomePage pages={pages} />} />
          <Route path="/p/:id" element={<BlogPostPage pages={pages} />} />
          <Route path="/about" element={<AboutMe />} />
        </Routes>
      </div>
    </Router>
  );
}

function HomePage({ pages }) {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-8">
      {pages.map((page) => (
        <div key={page.id} className="w-1/2">
          <Link to={`/p/${page.id}`}>
            <BlogHeader
              title={page.title}
              description={page.description}
              imageUrl={page.imageUrl}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

function BlogPostPage({ pages }) {
  const { id } = useParams();
  const selectedPost = pages.find((page) => page.id === parseInt(id));

  return (
    <div className="flex flex-wrap justify-center">
      {selectedPost && (
        <BlogPost
          title={selectedPost.title}
          description={selectedPost.description}
          imageUrl={selectedPost.imageUrl}
          content={selectedPost.content}
        />
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
