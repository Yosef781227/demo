import { GetMeQuery } from "@/query/user";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export default function useGetMe(): {
  loading: boolean;
  userInfo: any;
} {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [instagramId, setInstagramId] = useState("");
  const [instagrams, setInstagrams] = useState<any[]>([]);
  const [instagramIndex, setInstagramIndex] = useState(0);
  const [hasInstagram, setHasInstagram] = useState(false);
  const [tiktokId, settiktokId] = useState("");
  const [tiktoks, settiktoks] = useState<any[]>([]);
  const [tiktokIndex, settiktokIndex] = useState(0);
  const [hasTiktok, setHasTiktok] = useState(false);
  const {
    error, //TODO: error handling
    data,
  } = useQuery(GetMeQuery);

  useEffect(() => {
    if (data) {
      if (data == null || data?.errors) {
        console.log("User is not logged in");
        setIsAuth(false);
        setLoading(false);
      } else {
        setIsAuth(true);
        setLoading(false);

        if (data.me.has_instagram) {
          console.log("User has instagram");
          const index: number =
            localStorage.getItem("selectedInstagramIndex") !== null
              ? parseInt(localStorage.getItem("selectedInstagramIndex") || "")
              : 0;
          const instagrams = data.me.instagrams;
          localStorage.setItem("selectedInstagramIndex", index.toString());
          localStorage.setItem("instagrams", JSON.stringify(instagrams));
          setHasInstagram(true);
          setInstagramId(instagrams[index]?.id);
          setInstagrams(instagrams);
          setInstagramIndex(index);
        } else {
          console.log("User has no instagram");
          localStorage.removeItem("selectedInstagramIndex");
          localStorage.removeItem("instagrams");
        }
        if (data.me.has_tiktok) {
          console.log("User has tiktok");
          const index: number =
            localStorage.getItem("selectedTiktokIndex") !== null
              ? parseInt(localStorage.getItem("selectedTiktokIndex") || "")
              : 0;
          const tiktoks = data.me.tiktoks;
          localStorage.setItem("selectedTiktokIndex", index.toString());
          localStorage.setItem("tiktoks", JSON.stringify(tiktoks));
          settiktokId(tiktoks[index]?.id);
          settiktoks(tiktoks);
          settiktokIndex(index);
          setHasTiktok(true);
        } else {
          console.log("User has tiktok");
          localStorage.removeItem("selectedTiktokIndex");
          localStorage.removeItem("tiktoks");
        }
      }
    }
  }, [data]);
  return {
    loading,
    userInfo: {
      isAuth,
      instagramId,
      instagrams,
      instagramIndex,
      hasInstagram,
      tiktokId,
      tiktoks,
      tiktokIndex,
      hasTiktok,
    },
  };
}
