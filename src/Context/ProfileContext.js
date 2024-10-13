import React, { createContext, useContext, useState, useEffect } from "react";

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
    const [businessProfiles, setBusinessProfiles] = useState([]);
    const hasInvestorProfile = businessProfiles.some(profile => profile.type === "Investor");

    return (
        <ProfileContext.Provider value={{ businessProfiles, setBusinessProfiles, hasInvestorProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};
