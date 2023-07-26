import React, { useState } from "react";
import axios from "axios";

const URL = "http://localhost:4000";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleAddPost = async () => {
    if (!title || !description || !image || !content) {
      setPopupMessage("Please fill out all fields");
      setShowPopup(true);
      return;
    }

    // Convert image to base64
    let base64Image = "";
    try {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(image);
      fileReader.onload = () => {
        base64Image = fileReader.result;
        addPostWithImage(base64Image);
      };
    } catch (error) {
      console.error("Error converting image to base64:", error);
      setPopupMessage("Failed to add post! (Error converting image)");
      setShowPopup(true);
    }
  };

  const addPostWithImage = async (base64Image) => {
    const postData = {
      title: title,
      description: description,
      image: base64Image,
      content: content,
    };

    try {
      const response = await axios.post(URL + "/api/adddata", postData);
      console.log("Post added successfully:", response.data);
      setPopupMessage("Post added successfully!");
    } catch (error) {
      console.error("# Post Error", error);
      setPopupMessage("Failed to add post!");
    }

    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-3/5 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-3/5 mt-4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 resize-y"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-3/5 mt-4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "60%", minHeight: "100px" }} // Set the minimum height here
        className="mt-4 px-4 py-2 h-96 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 resize-y"
      />
      <button
        onClick={handleAddPost}
        className="w-3/5 mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
      >
        Add Post
      </button>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-lg w-96 flex flex-col">
            <p className="mb-4">{popupMessage}</p>
            <button
              onClick={handlePopupClose}
              className="self-end px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPost;
