import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xagxwxtezozrnxoqtsvh.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhZ3h3eHRlem96cm54b3F0c3ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM1MjYwNzIsImV4cCI6MjAxOTEwMjA3Mn0.j0fkNq6EhXz1FqfBWTHNsBJijsu90b9EaHtrzdhYhSk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
