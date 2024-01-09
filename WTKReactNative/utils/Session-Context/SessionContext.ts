import React, { createContext } from 'react';
import { Session } from '@supabase/supabase-js';

// Create a context with an initial value
export const SessionContext = createContext<Session | null>(null);
