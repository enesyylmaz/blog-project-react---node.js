import React from "react";

const BlogHeader = ({ title, description, image, date }) => {
  return (
    <div>
      <div className="bg-white p-4 m-2 rounded-md flex">
        <img
          src={image}
          alt={title}
          className="w-32 h-32 object-contain rounded-md mr-4 cursor-pointer"
        />
        <div class="flex flex-col">
          <a>
            <h2 class="text-xl font-bold cursor-pointer hover:text-gray-300">
              {title}
            </h2>
          </a>
          <p class="text-gray-600">{description}</p>
          <div class="mt-6"></div>
          <p class="text-gray-900">
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
      <hr className="my-4 border-t border-gray-300" />
    </div>
  );
};

export default BlogHeader;
