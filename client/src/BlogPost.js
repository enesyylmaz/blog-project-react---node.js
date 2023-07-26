import React from "react";

const BlogPost = ({ title, description, image, content }) => {
  return (
    <div className="bg-white p-4 m-2 shadow-md rounded-md w-3/5">
      <img
        src={`${image}`}
        alt="Base64 Image"
        className="w-1/2 object-cover rounded-md mx-auto"
      />
      <h2 className="text-3xl font-bold mt-6 text-center">{title}</h2>
      <hr className="mt-6" />
      <p className="text-gray-700 text-xl mt-6">{description}</p>
      <hr className="mt-6" />
      <div className="mt-6" style={{ whiteSpace: "pre-line" }}>
        {content}
      </div>
    </div>
  );
};

export default BlogPost;
