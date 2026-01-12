const ACCESS_KEY = "wDrP25iCpLkRMwo6Fdw4q6QNQq1JfG5MUKmFiMu9KUE";

export const fetchImages = async (page = 1) => {
  const res = await fetch(
    `https://api.unsplash.com/photos?page=${page}&per_page=9&client_id=${ACCESS_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch images");
  return res.json();
};
