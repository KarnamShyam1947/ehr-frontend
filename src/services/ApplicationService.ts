import MySwal from '../config/MySwal';
import { requestAccount } from './../smart-contract/AuthServices';

export const registerApplication     = async (data: any) => {

    try { 
        const walletAddress = await requestAccount();
        data = {
            ...data, 
            walletAddress: walletAddress,
            username:`${data.firstName} ${data.lastName}`,
            phoneNumber:data.phone
        }
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}api/v1/user-application/apply`,
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

export const getApplications = async () => {

    try { 
        
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}api/v1/user-application`,
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

export const acceptApplication = async (id: number) => {
    const result = await MySwal.fire({
        title: 'Are you sure?',
        text: 'You want to accept this application?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
    });

    // Only proceed if the user confirms the action
    if (result.isConfirmed) {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}api/v1/user-application/accept/${id}`,
            {
                method: "GET"
            }
        );

        // Check if the response is successful and return it
        if (response.ok) {
            return await response.json();
        } else {
            return { statusCode: response.status, error: "Failed to accept application" };
        }
    }

    return null; // Return null if the action is not confirmed
}

export const rejectApplication = async (id: number) => {
    const result = await MySwal.fire({
        title: 'Are you sure?',
        text: 'You want to reject this application?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
    });

    // Only proceed if the user confirms the action
    if (result.isConfirmed) {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}api/v1/user-application/reject/${id}`,
            {
                method: "GET"
            }
        );

        // Check if the response is successful and return it
        if (response.ok) {
            return await response.json();
        } else {
            return { statusCode: response.status, error: "Failed to reject application" };
        }
    }

    return null; // Return null if the action is not confirmed
};
