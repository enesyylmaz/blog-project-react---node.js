import React from "react";

const BlogHeader = ({ title, description, imageUrl }) => {
  return (
    <div className="bg-white p-4 m-2 rounded-md flex border-b-2 border-gray-300">
      <img
        src={imageUrl}
        alt={title}
        className="w-32 h-32 object-contain rounded-md mr-4"
      />
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default BlogHeader;
