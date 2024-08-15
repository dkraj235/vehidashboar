import React, { useEffect, useState } from 'react';
import { createContext } from 'react';

const SocialMediaContext = createContext();

const SocialMediaProvider = ({ children }) => {
    const [socialMediaData, setSocialMediaData] = useState();
    useEffect(() => {
        fetchSocialMediaData().then(data => {
            setSocialMediaData(data);
        });
    }, []);

    const fetchSocialMediaData = async () => {
        let baseUrl;
        if (process.env.NODE_ENV === 'development') {
            baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
        } else {
            baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
        }

        const response = await fetch(`${baseUrl}/settings/social-media`);
        const data = await response.json();
        return data;
    };

    return (
        <SocialMediaContext.Provider value={{ socialMediaData, setSocialMediaData }}>
            {children}
        </SocialMediaContext.Provider>
    );
};

export { SocialMediaContext, SocialMediaProvider };
