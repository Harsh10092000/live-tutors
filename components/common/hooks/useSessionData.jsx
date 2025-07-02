import { useSession } from 'next-auth/react';


export const useSessionData = () => {
    const { data: session, status } = useSession();
    const isLoggedIn = status === "authenticated";
    const userID = session?.user?.id;
    const userEmail = session?.user?.email;
    const userName = session?.user?.name;

    return { isLoggedIn, userID, userEmail, userName };
}; 