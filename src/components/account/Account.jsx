"use client";
import React, { useState } from 'react';
import Profile from '@/components/account/Profile';
import MyCompany from '@/components/account/MyCompany';
import UserStories from '@/components/account/UserStories';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderTab = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile />;
      case 'company':
        return <MyCompany />;
      case 'stories':
        return <UserStories />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="container my-5">
      <div className="row rounded" style={{ minHeight: '400px', borderColor: "#efefef" }}>
        {/* Tabs Sidebar */}
        <div className="col-md-3 border-end p-3">
          <ul className="nav flex-column" style={{display: "flex"}}>
            {[
              { key: 'profile', label: 'Profile' },
              { key: 'company', label: 'My Company' },
              { key: 'stories', label: 'My Stories' }
            ].map((tab) => (
              <li className="nav-item mb-2" key={tab.key}>
                <button
                  className={`custom-tab-button w-100 ${activeTab === tab.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tab Content */}
        <div className="col-md-9 p-4">
          {renderTab()}
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .custom-tab-button {
          font-size: 14px;
          padding: 6px 12px;
          border: 1px solid #dc3545;
          background-color: transparent;
          color: #dc3545;
          border-radius: 6px;
          transition: all 0.2s ease-in-out;
        }

        .custom-tab-button.active {
          background-color: #dc3545;
          color: white;
        }

        .custom-tab-button:hover {
          background-color: #dc3545;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Account;
