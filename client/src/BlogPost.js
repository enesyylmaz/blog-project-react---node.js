import React from "react";

const BlogPost = ({ title, description, imageUrl, content }) => {
  return (
    <div className="bg-white p-4 m-2 shadow-md rounded-md w-3/5">
      <img
        src={imageUrl}
        alt={title}
        className="w-3/5 object-cover rounded-md mx-auto"
      />
      <h2 className="text-xl font-bold mt-6">{title}</h2>
      <p className="text-gray-600 mt-6">{description}</p>
      <div className="mt-6">{content}</div>
    </div>
  );
};

export default BlogPost;
