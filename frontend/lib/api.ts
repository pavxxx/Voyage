const API_URL = process.env.NEXT_PUBLIC_API_URL!;

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
        travel_style: string;
        travellers: number;
    },
    token: string
) {
    const response = await fetch(
        `${API_URL}/trip`,
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
        `${API_URL}/trip/${tripId}`,
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
    destination: string,
    days: number,
    budget: string,
    travellers: number
) {

    const response = await fetch(

        `${API_URL}/trip-cost/${destination}?days=${days}&budget=${budget}&travellers=${travellers}`

    );

    return response.json();
}

export async function getDestinations() {
    const response = await fetch(
        `${API_URL}/destinations`
    );

    return await response.json();
}