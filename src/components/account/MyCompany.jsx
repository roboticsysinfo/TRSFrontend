'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanyByUserId, updateCompany } from '@/redux/slices/companySlice';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const MyCompany = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { user } = useSelector((state) => state.auth);
    const { userCompany, loading, error } = useSelector((state) => state.companies);

    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState(null);
    const [logo, setLogo] = useState(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (user?._id) {
            dispatch(fetchCompanyByUserId(user._id)).then((res) => {
                if (
                    res.meta.requestStatus === 'rejected' &&
                    (res.payload === 'Company not found for this user' ||
                        res.error?.message === 'Company not found for this user')
                ) {
                    setNotFound(true);
                } else {
                    setNotFound(false);
                }
            });
        }
    }, [user, dispatch]);

    useEffect(() => {
        if (userCompany) {
            setFormData({
                name: userCompany.name,
                about: userCompany.about,
                legalName: userCompany.legalName,
                headquarter: userCompany.headquarter,
                foundingDate: userCompany.foundingDate?.split('T')[0],
                businessModel: userCompany.businessModel,
                noOfEmployees: userCompany.noOfEmployees,
            });
        }
    }, [userCompany]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogoChange = (e) => {
        setLogo(e.target.files[0]);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatePayload = new FormData();
        for (const key in formData) {
            updatePayload.append(key, formData[key]);
        }
        if (logo) updatePayload.append('logo', logo);

        const res = await dispatch(updateCompany({ id: userCompany._id, updateData: updatePayload }));

        if (res.meta.requestStatus === 'fulfilled') {
            toast.success('Company updated successfully');
            setEditMode(false);
            router.push('/account');
        } else {
            toast.error(res.payload || 'Update failed');
        }
    };

    if (loading) return <div className="text-center my-5">Loading...</div>;

    if (notFound) {
        return (
            <div className="container mt-5 text-center">
                <img src="/assets/img/company.svg" alt="Not Found" className="img-fluid" style={{ width: 300, height: 200 }} />
                <h4 className="mt-4 fw-bold">Company Not Found</h4>
                <p>You haven’t created a company yet.</p>
                <button className="btn btn-sm btn-outline-primary">
                    <Link href="/account/list-my-company" style={{ color: '#fff' }}>
                        List Your Startup
                    </Link>
                </button>
            </div>
        );
    }

    if (!userCompany) return null;

    return (
        <div className="container mt-4">
            <h4 className="mb-3 fw-bold">My Company</h4>
            <div className="card p-4 shadow-sm border">
                {!editMode ? (
                    <div className="row">
                        <div className="col-md-8">
                            <h5>{userCompany.name}</h5>
                            <p className="text-muted">{userCompany.legalName}</p>
                            <p><strong>About:</strong> {userCompany.about}</p>
                            <p><strong>Headquarter:</strong> {userCompany.headquarter}</p>
                            <p><strong>Founded:</strong> {new Date(userCompany.foundingDate).toDateString()}</p>
                            <p><strong>Business Model:</strong> {userCompany.businessModel}</p>
                            <p><strong>Employees:</strong> {userCompany.noOfEmployees}</p>
                            <p><strong>Category:</strong> {userCompany.category?.name}</p>
                        </div>
                        <div className="col-md-4 text-end">
                            {userCompany.logo && (
                                <img
                                    src={userCompany.logo}
                                    alt="Logo"
                                    className="img-fluid rounded mb-2"
                                    style={{ maxHeight: '100px' }}
                                />
                            )}
                            <button className="btn btn-outline-primary btn-sm" onClick={() => setEditMode(true)}>
                                Edit Info
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleUpdate} encType="multipart/form-data">
                        <div className="mb-3">
                            <label className="form-label">Company Name</label>
                            <input type="text" className="form-control" name="name" value={formData.name || ''} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Legal Name</label>
                            <input type="text" className="form-control" name="legalName" value={formData.legalName || ''} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Headquarter</label>
                            <input type="text" className="form-control" name="headquarter" value={formData.headquarter || ''} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Founding Date</label>
                            <input type="date" className="form-control" name="foundingDate" value={formData.foundingDate || ''} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">About</label>
                            <textarea className="form-control" name="about" value={formData.about || ''} onChange={handleChange}></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Business Model</label>
                            <select className="form-select" name="businessModel" value={formData.businessModel || ''} onChange={handleChange} required>
                                <option value="">Select</option>
                                <option value="B2C">B2C</option>
                                <option value="B2B">B2B</option>
                                <option value="B2B2C">B2B2C</option>
                                <option value="D2C">D2C</option>
                                <option value="C2C">C2C</option>
                                <option value="B2G">B2G</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Number of Employees</label>
                            <select className="form-select" name="noOfEmployees" value={formData.noOfEmployees || ''} onChange={handleChange} required>
                                <option value="">Select</option>
                                <option value="0-10">0–10</option>
                                <option value="10-100">10–100</option>
                                <option value="100-1000">100–1,000</option>
                                <option value="1000-100000">1,000–100,000</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Company Logo</label>
                            <input type="file" accept="image/*" className="form-control" onChange={handleLogoChange} />
                            {logo && (
                                <div className="mt-2">
                                    <img src={URL.createObjectURL(logo)} alt="Preview" style={{ height: '100px' }} />
                                </div>
                            )}
                        </div>

                        <div className="d-flex justify-content-between">
                            <button type="button" className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
                            <button type="submit" className="btn btn-success" disabled={loading}>
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default MyCompany;
