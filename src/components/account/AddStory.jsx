"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '@/redux/slices/categorySlice';
import { addStory, clearStoryMessage } from '@/redux/slices/storySlice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import the CKEditor wrapper with SSR disabled
const CKEditorClient = dynamic(() => import('@/components/account/CKEditorClient'), {
  ssr: false,
});

const AddStory = () => {


  const dispatch = useDispatch();
  const router = useRouter();
  const { categories } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.auth);
  const { loading, message, error } = useSelector((state) => state.story);


  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  });


  const [storyImage, setStoryImage] = useState(null);


  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      toast.success(
        'Thank you! Your story has been submitted successfully. It will appear in the admin panel for review. Once approved by our team, it will be published publicly.',
        { autoClose: 7000 }
      );
      dispatch(clearStoryMessage());
      setFormData({ title: '', description: '', category: '' });
      setStoryImage(null);
    }

    if (error) {
      toast.error(error);
      dispatch(clearStoryMessage());
    }
  }, [message, error, dispatch]);


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setStoryImage(file);
    } else {
      toast.warning("Please upload a valid image file");
    }
  };


  const handleSubmit = (e) => {

    e.preventDefault();
    const { title, description, category } = formData;

    if (!title || !description || !category) {
      toast.warning('Please fill in all fields');
      return;
    }

    if (!user?._id) {
      toast.error('User not authenticated');
      return;
    }

    const payload = new FormData();
    payload.append('title', title);
    payload.append('description', description);
    payload.append('category', category);
    payload.append('user', user._id);

    if (storyImage) {
      payload.append('storyImage', storyImage);
    }

    dispatch(addStory(payload));
    router.push("/account");
  };



  return (

    <div className="container my-5">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-8 col-sm-12">
          <div className="card shadow-sm">
            <div className="card-header bg-danger">
              <h5 className="mb-0 text-white fw-bold">Add Your Story</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} encType="multipart/form-data">

                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="Enter title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>


                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
                  <select
                    className="form-select"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select category</option>
                    {categories?.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="storyImage" className="form-label">Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="storyImage"
                    name="storyImage"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {storyImage && (
                    <small className="text-success mt-1 d-block">
                      Selected: {storyImage.name}
                    </small>
                  )}
                </div>


                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <CKEditorClient
                    value={formData.description}
                    onChange={(data) =>
                      setFormData((prev) => ({ ...prev, description: data }))
                    }
                  />
                </div>



                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  )}
                  Submit Story
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStory;
