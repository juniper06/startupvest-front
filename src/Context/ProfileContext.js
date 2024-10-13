import React, { createContext, useContext, useState, useEffect } from "react";

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
    const [businessProfiles, setBusinessProfiles] = useState([]);

    // Check if the user has an investor profile
    const hasInvestorProfile = businessProfiles.some(profile => profile.type === "Investor");

    // Load profiles from localStorage when the component mounts
    useEffect(() => {
        const storedProfiles = localStorage.getItem('businessProfiles');
        if (storedProfiles) {
            setBusinessProfiles(JSON.parse(storedProfiles));
        }
    }, []);

    // Save profiles to localStorage whenever businessProfiles changes
    useEffect(() => {
        if (businessProfiles.length > 0) {
            localStorage.setItem('businessProfiles', JSON.stringify(businessProfiles));
        }
    }, [businessProfiles]);

    return (
        <ProfileContext.Provider value={{ businessProfiles, setBusinessProfiles, hasInvestorProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};
