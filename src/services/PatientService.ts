export const fetchAccessList = async (userId: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}api/v1/patient/access-list/${userId}`); 
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        return userData;
    } catch (err:any) {
        return { error: err.message };
    }
};

export const grantAccessBackend = async (userId: string, walletAddress: string) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}api/v1/patient/access-list/${userId}/add?walletAddress=${walletAddress}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ); 
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        return userData;
    } catch (err:any) {
        return { error: err.message };
    }
}

export const removeAccessBackend = async (userId: string, walletAddress: string) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}api/v1/patient/access-list/${userId}/remove?walletAddress=${walletAddress}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ); 
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        return userData;
    } catch (err:any) {
        return { error: err.message };
    }
}
