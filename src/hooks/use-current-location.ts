import { useEffect, useState } from "react";
import * as Location from "expo-location";

export function useCurrentLocation() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getLocation = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setError("Permission to access location was denied");
                return;
            }
            const location = await Location.getCurrentPositionAsync();
            setLocation(location);
            setLoading(false);
        };
        getLocation();
    }, []);
    return { location, error, loading };
}