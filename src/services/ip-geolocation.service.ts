import { env } from 'process';
import { LocationData } from 'types/types';

export const getLocationByIpAddress = async (ip: string | string[] | undefined): Promise<LocationData | undefined> => {
    if (!ip) return undefined;

    try {
        const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${env.IP_GEOLOCATION_API_TOKEN}&ip=${Array.isArray(ip) ? ip[0] : ip}`);
        const locationData = await response.json();
        console.log(locationData);
        return locationData;
    } catch {
        return undefined;
    }
};