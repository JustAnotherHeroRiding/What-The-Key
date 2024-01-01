import { PrismaService } from '../services/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getUserByEmail(email: string): Promise<any>;
    getProfile(userId: string): Promise<{
        id: string;
        updated_at: Date;
        username: string;
        full_name: string;
        avatar_url: string;
        website: string;
    }>;
}
