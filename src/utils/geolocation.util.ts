import axios from "axios";

interface LocationDetails {
  coordinates: [number, number];
  location: string;
}

export const fetchLocationDetails = async (
  latitude: number,
  longitude: number
): Promise<LocationDetails> => {
  try {
    const response = await axios.get(
      // `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`

      `https://nominatim.openstreetmap.org/reverse?format=json&lat=40.730610&lon=-73.935242&zoom=18&addressdetails=1`

    );
    const { display_name } = response.data;
    return {
      coordinates: [latitude, longitude],
      location: display_name,
    };
  } catch (error) {
    console.error("Error fetching location details:", error);
    throw new Error("Failed to fetch location details");
  }
};
