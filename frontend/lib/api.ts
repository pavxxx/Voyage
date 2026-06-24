const API_URL = "http://127.0.0.1:8000";

export async function login(
    email: string,
    password: string
) {
    const response = await fetch(
        `${API_URL}/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        }
    );

    return response.json();
}

export async function getMyTrips(
    token: string
) {
    const response = await fetch(
        `${API_URL}/my-trips`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.json();
}

export async function createTrip(
    trip: {
        destination: string;
        start_date: string;
        end_date: string;
        budget: string;
    },
    token: string
) {
    const response = await fetch(
        "http://127.0.0.1:8000/trip",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(trip),
        }
    );

    return response.json();
}

export async function deleteTrip(
    tripId: number,
    token: string
) {
    const response = await fetch(
        `http://127.0.0.1:8000/trip/${tripId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.json();
}

export async function getRecommendations(
    token: string
) {
    const response = await fetch(
        `${API_URL}/recommendations`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.json();
}

export async function getProfile(
    token: string
) {
    const response = await fetch(
        `${API_URL}/profile`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.json();
}

export async function getTripCost(
    destination: string
) {

    const response = await fetch(
        `http://127.0.0.1:8000/trip-cost/${destination}`
    );

    return response.json();
}