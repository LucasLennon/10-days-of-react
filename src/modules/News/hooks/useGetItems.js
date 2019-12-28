import { useEffect, useState } from "react";
import API from "../services";

function useGetItems(storedIDS) {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    async function getItemsInformation() {
      storedIDS.forEach(async (value, index) => {
        const item = await API.get("item/" + value + ".json");
        if (!!item) {
          setNewsList(n => [...n, item]);
        }
      });
    }

    if (storedIDS.length > 0) {
      getItemsInformation();
    }
    return () => {
      setNewsList([]);
    };
  }, [storedIDS]);

  return [newsList];
}

export default useGetItems;
