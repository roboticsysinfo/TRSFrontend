'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, updateUser } from '@/redux/slices/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const userId = user?._id;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
    });

    const [image, setImage] = useState(null);
    const [localLoading, setLocalLoading] = useState(false);

    useEffect(() => {
        if (userId) {
            dispatch(getUserById(userId));
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalLoading(true);

        const updatePayload = new FormData();
        updatePayload.append('name', formData.name);
        updatePayload.append('email', formData.email);
        updatePayload.append('phoneNumber', formData.phoneNumber);
        if (image) updatePayload.append('profileImage', image);

        const res = await dispatch(updateUser({ id: userId, userData: updatePayload }));

        if (res.meta.requestStatus === 'fulfilled') {
            toast.success('Profile updated successfully!');
        } else {
            toast.error(res.payload || 'Failed to update profile.');
        }

        setLocalLoading(false);
    };

    return (
        <>
            <div className="mb-4">
                <h4 className="fw-bold mb-1">My Profile</h4>
                <p className="text-muted mb-3" style={{ fontSize: '14px' }}>
                    Update your personal information and profile picture.
                </p>
            </div>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={localLoading}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                        name="phoneNumber"
                        className="form-control"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        disabled={localLoading}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        name="email"
                        type="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={localLoading}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Profile Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={handleImageChange}
                        disabled={localLoading}
                    />
                </div>

                <button className="btn btn-primary" type="submit" disabled={localLoading}>
                    {localLoading ? 'Updating...' : 'Update'}
                </button>
            </form>
        </>
    );
};

export default Profile;
