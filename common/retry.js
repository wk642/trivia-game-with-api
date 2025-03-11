import fetch from 'node-fetch';

export default async function retry429(url, errorValue = null, maxNumberOfRetries = 3, delay = 1000) {
  let numberOfRetries = 0;
  while (numberOfRetries < maxNumberOfRetries) {
      try {
          const response = await fetch(url);
          if (response.status === 429) {
              numberOfRetries++;
              console.log(`Too Many Requests (Retry ${numberOfRetries}/${maxNumberOfRetries}). Retrying in ${delay / 1000} seconds.`);
              await new Promise(resolve => setTimeout(resolve, delay));
              delay *= 2;
          } else {
              return response;
          }
      } catch (error) {
          console.error("Fetch error:", error);
          numberOfRetries++;
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2;
      }
  }
  console.error("Using default value");
  return errorValue;
}