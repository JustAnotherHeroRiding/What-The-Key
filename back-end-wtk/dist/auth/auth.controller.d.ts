export declare class UserController {
    getSession(request: any): Promise<{
        user: import("@supabase/gotrue-js").User;
    } | {
        user: null;
    }>;
    getAllUsers(): Promise<({
        users: import("@supabase/gotrue-js").User[];
        aud: string;
    } & import("@supabase/gotrue-js").Pagination) | {
        users: [];
    }>;
}
