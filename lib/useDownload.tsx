import toast from "react-hot-toast";

export const downloadFile = async (imageUrl: string) => {
  try {
    const image = await fetch(imageUrl);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = Date.now().toString();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (e) {
    toast.error("Something went wrong, please try again later");
    console.log(e);
    return e;
  }
};
