'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const DEFAULT_PHOTO = 'https://res.cloudinary.com/akphv6j6/image/upload/v1787869354/61476690723.png';
const BACKEND = process.env.NEXT_PUBLIC_API_URL || 'https://myportfolio-owi0.onrender.com';

const ProfileContext = createContext({ profileImageUrl: DEFAULT_PHOTO, setProfileImageUrl: () => {} });

export function ProfileProvider({ children }) {
    const [profileImageUrl, setProfileImageUrl] = useState(DEFAULT_PHOTO);

    useEffect(() => {
        fetch(`${BACKEND}/api/upload/settings`, { signal: AbortSignal.timeout(8000) })
            .then(r => r.json())
            .then(data => {
                if (data?.profileImageUrl) setProfileImageUrl(data.profileImageUrl);
            })
            .catch(() => {}); // fallback to default
    }, []);

    return (
        <ProfileContext.Provider value={{ profileImageUrl, setProfileImageUrl }}>
            {children}
        </ProfileContext.Provider>
    );
}

export const useProfile = () => useContext(ProfileContext);
