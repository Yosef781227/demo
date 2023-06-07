export const handleDownload = (url: string) => {
  window.open(url.includes("https://") ? url : "https://" + url, "_current");
};
