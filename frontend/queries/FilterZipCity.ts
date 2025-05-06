//this function checks if the input query has a valid 5 digit zip code or a city name or both
//returns zip code if both are present
//retuns zip code if only zip code is present
//returns city name if only city is present
//returns empty string if both are not present
export default function FilterZipCity(inputQuery: string): { key: string; value: string } {
  const regex = /\b(\d{5})\b|([a-zA-Z\s]+)/g;
  const matches = inputQuery.match(regex);

  let zipCode: string | null = null;
  let cityName: string | null = null;

  if (matches) {
    for (const match of matches) {
      const trimmed = match.trim();
      if (/^\d{5}$/.test(trimmed) && !zipCode) {
        zipCode = trimmed;
      } else if (/^[a-zA-Z\s]+$/.test(trimmed) && !cityName) {
        cityName = trimmed;
      }
    }
  }

  if (zipCode) {
    return { key: "zip", value: zipCode };
  } else if (cityName) {
    return { key: "city", value: cityName.toLowerCase() };
  } else {
    return { key: "none", value: "none" };
  }
}

  