
export const applyAppointment = async (data: any) => {
    try { 
        
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}api/v1/appointment`,
            {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
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

export const getPatientAppointments = async (id: number) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}api/v1/patient/appointment/${id}`);
        return await response.json();
    } catch (error) {
        console.log(`error while make api call : ${error}`);
        return null;
    }
}

export const getDoctorAppointments = async (id: number) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}api/v1/doctor/appointment/${id}`);
        return await response.json();
    } catch (error) {
        console.log(`error while make api call : ${error}`);
        return null;
    }
}

export const cancelAppointment = async (id: number) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}api/v1/patient/appointment/${id}/cancel`);
        return await response.json();
    } catch (error) {
        console.log(`error while make api call : ${error}`);
        return null;
    }
}

export const acceptAppointment = async (id: number) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}api/v1/doctor/appointment/${id}/accept`,
            {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                }
            }
        );
        return await response.json();
    } catch (error) {
        console.log(`error while make api call : ${error}`);
        return null;
    }
}

export const rejectAppointment = async (id: number, reason: string) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}api/v1/doctor/appointment/${id}/reject?reason=${reason}`,
            {
                method: "POST"
            }
        );
        return await response.json();
    } catch (error) {
        console.log(`error while make api call : ${error}`);
        return null;
    }
}



