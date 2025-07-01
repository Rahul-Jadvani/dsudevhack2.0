import React from "react";
import "./ProfileCard.css";

interface ProfileCardProps {
  image: string;
  name: string;
  designation: string;
  department: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ image, name, designation, department }) => {
  return (
    <div className="profile-card">
      <div
        className="profile-card-bg"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="profile-card-text">
        <div className="profile-card-name">{name}</div>
        <div className="profile-card-designation">{designation}</div>
        <div className="profile-card-department">{department}</div>
      </div>
    </div>
  );
};

export default ProfileCard; 