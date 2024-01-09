import React, { createContext, useState, useContext, useEffect } from 'react';
import { SessionContext } from '../Session/SessionContext';
import { supabase } from '../../supabase';

interface ProfilePicContextType {
    profilePicUrl: string | null;
    setProfilePicUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ProfilePicContext = createContext<ProfilePicContextType>({
    profilePicUrl: null,
    setProfilePicUrl: () => { }
});

interface ProfilePicProviderProps {
    children: React.ReactNode;
}

export const ProfilePicProvider = ({ children }: ProfilePicProviderProps) => {
    const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);
    const session = useContext(SessionContext);

    useEffect(() => {

        if (session && !profilePicUrl) {
            supabase.from('profiles').select('avatar_url').eq('id', session.user.id).single().then((data) => {
                setProfilePicUrl(data.data?.avatar_url)
            })

        }
    },
        [session])

    return (
        <ProfilePicContext.Provider value={{ profilePicUrl, setProfilePicUrl }}>
            {children}
        </ProfilePicContext.Provider>
    );
};
