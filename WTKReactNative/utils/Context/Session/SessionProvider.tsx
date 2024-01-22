import React, { useState, useEffect, ReactNode } from 'react';
import { SessionContext } from './SessionContext';
import { supabase } from '../../config/supabase';
import { Session } from '@supabase/supabase-js';


interface SessionProviderProps {
    children: ReactNode;
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        // Check current session and set it
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        // Listen for future auth changes
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            authListener.subscription!.unsubscribe();
        };
    }, []);

    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    );
};
