import React from "react";
import { Link } from "react-router-dom";

const BlogHeader = ({ title, description, image, date, tags, _id }) => {
  return (
    <div>
      <div className="bg-white p-4 m-2 rounded-md flex">
        <Link to={`/p/${_id}`}>
          <img
            src={image}
            alt={title}
            className="w-32 h-32 object-contain rounded-md mr-4 cursor-pointer"
          />
        </Link>
        <div className="flex flex-col">
          <Link to={`/p/${_id}`}>
            <a>
              <h2 className="text-xl font-bold cursor-pointer hover:text-gray-300">
                {title}
              </h2>
            </a>
          </Link>
          <p className="text-gray-600">{description}</p>
          <div className="mt-6"></div>
          <p className="text-gray-900">
            {"Date: "}
            {new Date(date).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })}{" "}
            {new Date(date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-stretch">
        {tags.map((tag, index) => (
          <div key={index}>
            <div className="w-fit mt-1 mb-1 mx-2 px-4  py-1  rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 resize-y">
              <span className="cursor-default">{tag} </span>
            </div>
          </div>
        ))}
      </div>
      <hr className="my-4 border-t border-gray-300" />
    </div>
  );
};

export default BlogHeader;
