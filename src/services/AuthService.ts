
export const login = async (walletAddress: string|undefined, password: string|undefined) => {
    const data = {
        "walletAddress" : walletAddress,
        "password" : password
    };

    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}api/v1/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        return await response.json();
        
    } catch (error) {
        console.log(`error while make api call : ${error}`);
        return null;
    }
}

export const register = async (data: any) => {
    data = {...data, username: `${data.firstName} ${data.lastName}`}
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}api/v1/auth/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        return await response.json();
        
    } catch (error) {
        console.log(`error while make api call : ${error}`);
        return null;
    }
}

export const fetchDoctors = async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}api/v1/doctor`,
            {
                method: "GET"
            }
        );

        return await response.json();
        
    } catch (error) {
        console.log(`error while make api call : ${error}`);
        return null;
    }
}

export const setPassword = async (data: any) => {

    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}api/v1/auth/set-password`,
            {   
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        ); 

        return await response.json();
        
    } catch (error) {
        console.log(`error while make api call : ${error}`);
        return null;
    }
    
}

