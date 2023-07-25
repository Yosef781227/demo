import { toast } from "react-toastify";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { MessageType } from "@/interfaces/message";

export const handleDownload = (url: string) => {
  window.open(url.includes("https://") ? url : "https://" + url, "_current");
};

export const logout = async () => {
  try {
    const response: any = await axios.post(
      BASE_URL,
      {
        query: `
        mutation Mutation {
          logout {
            success
            message
          }
        }
        `,
      },
      {
        withCredentials: true,
      }
    );
    //console.log(response.data);
    if (response.data.data.logout.success) {
      localStorage.removeItem("selectedInstagramIndex");
      localStorage.removeItem("instagrams");
      window.location.reload();
    } else {
      toast.error(response.data.data.logout.message);
    }
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const saveNewContent = async (messageToast: any) => {
  const index: number =
    localStorage.getItem("selectedInstagramIndex") !== null
      ? parseInt(localStorage.getItem("selectedInstagramIndex") || "")
      : 0;

  const instas: any =
    JSON.parse(localStorage.getItem("instagrams") || "[]") || [];
  const instagramId = instas[index]?.id;
  axios
    .post(
      BASE_URL,
      {
        query: `
        mutation Mutation($jsonInput: String!) {
          savePostsAndReels(json_input: $jsonInput) {
            success
            message
          }
        } 
        `,
        variables: {
          jsonInput: JSON.stringify({
            instagram_id: instagramId,
          }),
        },
      },
      { withCredentials: true }
    )
    .then((result) => {
      if (result.data.errors) {
        console.error("GraphQL errors", result.data.errors);
        toast.error("GraphQL errors: " + JSON.stringify(result.data.errors));
      } else if (!result.data.data) {
        messageToast.setType(MessageType.ERROR);
        messageToast.setMessage(
          "Unexpected server response: " + JSON.stringify(result.data)
        );
        messageToast.setTimeout(3000);
        messageToast.setTitle("Error");
      } else {
        let toastMessage = "";
        if (result.data.data.savePostsAndReels.success) {
          toastMessage +=
            "Posts and Reels: " + result.data.data.savePostsAndReels.message;
        } else {
          toastMessage +=
            "Posts and Reels: Error - " +
            result.data.data.savePostsAndReels.message;
        }
        messageToast.setType(MessageType.SUCCESS);
        messageToast.setMessage(toastMessage);
        messageToast.setTimeout(3000);
        messageToast.setTitle("Success");
        messageToast.setIsShow(true);
      }
    })
    .catch((error) => {
      console.error(error);
      toast.error("Network error: " + error.message);
    });
};
