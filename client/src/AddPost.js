import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const URL = "https://newblogprojectbackend.onrender.com";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState("");

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleTagInputChange = (value) => {
    const lowercaseValue = value.toLowerCase();
    setTagInput(lowercaseValue);
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    setTagInput("");
  };

  const removeTag = (index) => {
    setTags(tags.filter((el, i) => i !== index));
  };

  useEffect(() => {
    const getCurrentDate = () => {
      const date = new Date();
      date.setUTCHours(date.getUTCHours());
      const options = {
        timeZone: "UTC",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        fractionalSecondDigits: 3,
      };
      const formattedDate = date.toISOString();
      setCurrentDate(formattedDate);
    };

    getCurrentDate();
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        setShowPopup(false);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const isAdminAuthenticated = localStorage.getItem("isAdminAuthenticated");

    if (!isAdminAuthenticated) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleAddPost = async () => {
    if (!title || !description || !image || !content || !tags) {
      setPopupMessage("Please fill out all fields");
      setShowPopup(true);
      return;
    }

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
      date: currentDate,
      tags: tags,
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
    navigate("/");
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
        className="w-3/5 mt-4 px-4 py-2 h-96 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 resize-y"
      />
      <div
        className="w-3/5 mt-4 px-4 py-2
       rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 resize-y"
      >
        <div className="flex flex-row flex-wrap items-stretch ">
          {tags.map((tag, index) => (
            <div key={index}>
              <div className="w-fit mt-4 mx-4 px-4 py-2  rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 resize-y">
                <span className="cursor-default">{tag} </span>
                <span
                  className="cursor-pointer rounded bg-gray-300"
                  onClick={() => removeTag(index)}
                >
                  &times;
                </span>
              </div>
            </div>
          ))}
        </div>
        <input
          onKeyPress={handleKeyPress}
          onKeyDown={handleKeyDown}
          value={tagInput}
          onChange={(e) => handleTagInputChange(e.target.value)}
          type="text"
          className="w-full mt-4 px-4 py-2 mt-4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Enter tags by pressing enter"
        />
      </div>
      <ReactQuill theme="snow" className="w-3/5 mt-4 rounded-md"></ReactQuill>
      <button
        onClick={handleAddPost}
        className="w-3/5 mt-4 px-4 py-2 my-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
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
