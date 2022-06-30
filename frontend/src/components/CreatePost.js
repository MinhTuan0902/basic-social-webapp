import React, { useEffect, useState } from "react";
import PostApi from "../APIs/post";
import loadingGif from "../assets/loading.gif";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleChangeImage = async (event) => {
    const image = event.target.files[0];
    setImage(image);
    setPreviewImage(URL.createObjectURL(image));
  };

  const fetchCreatePost = async () => {
    setIsCreating(true);

    const newPost = await PostApi.createPost(caption, image);
    if (newPost.newPost) {
      setCaption("");
      setImage(null);
      setPreviewImage(null);
      setIsCreating(false);
      alert(newPost.message);
    } else {
      alert(newPost.message);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewImage(null);
  };

  const handleCreatePost = async (event) => {
    event.preventDefault();
    fetchCreatePost();
  };

  useEffect(() => {
    document.title = "Create New Post";
  }, []);

  return (
    <form className="flex flex-col" encType="multipart/form-data">
      <p className="text-gray-400 italic text-sm mt-1 mb-2">
        #Note: Upload image is slow! If you create a new post includes an image,
        please wait for uploading image!
      </p>
      <input
        className="w-full p-2 rounded border-2 border-gray-300 mb-2"
        placeholder="> Caption: REQUIRED FIELD"
        type="text"
        name="caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <p className="mb-2">Upload an image</p>
      <input type="file" name="image" onChange={handleChangeImage} />

      {previewImage && (
        <div className="p-3 flex flex-col items-center">
          <img className="w-fit h-fit rounded-xl" src={previewImage} />
          <button
            className="p-1 text-sm bg-red-500 mt-2 rounded-full"
            onClick={handleRemoveImage}
          >
            Remove
          </button>
        </div>
      )}
      {isCreating && (
        <div className="flex flex-col items-center mt-2">
          <img src={loadingGif} />
          <p className="mt-1">Post is creating...Please wait</p>
        </div>
      )}
      {caption && (
        <div>
          <button
            onClick={handleCreatePost}
            className="p-3 bg-red-300 w-fit mt-2 rounded-full"
          >
            Submit
          </button>
        </div>
      )}
    </form>
  );
};

export default CreatePost;
