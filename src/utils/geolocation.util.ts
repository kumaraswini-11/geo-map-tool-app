import axios from "axios";

// Interface for location details
interface LocationDetails {
  coordinates: [number, number];
  location: string;
}

// Function to fetch location details using latitude and longitude
export const fetchLocationDetails = async (
  latitude: number,
  longitude: number
): Promise<LocationDetails> => {
  try {
    const response = await axios.get(
      // Original API endpoint
      // `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`

      // Hardcoded example endpoint for testing
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
