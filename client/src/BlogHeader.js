import React from "react";

const BlogHeader = ({ title, description, image }) => {
  return (
    <div>
      <div className="bg-white p-4 m-2 rounded-md flex">
        <img
          src={image}
          alt={title}
          className="w-32 h-32 object-contain rounded-md mr-4 cursor-pointer"
        />
        <div>
          <a>
            <h2 className="text-xl font-bold cursor-pointer hover:text-gray-300">
              {title}
            </h2>
          </a>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
      <hr className="my-4 border-t border-gray-300" />
    </div>
  );
};

export default BlogHeader;
