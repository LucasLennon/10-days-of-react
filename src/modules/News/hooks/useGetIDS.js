import { useEffect, useState } from "react";
import API from "../services";

function listType(value) {
  var response;
  switch (value) {
    case "/tops":
      response = "topstories.json";
      break;
    case "/news":
      response = "newstories.json";
      break;
    case "/asks":
      response = "askstories.json";
      break;
    case "/show":
      response = "showstories.json";
      break;
    case "/jobs":
      response = "jobstories.json";
      break;
    default:
      response = "topstories.json";
      break;
  }
  return response;
}

function useGetIDS(maxItems, type, setMaxItems) {
  const [storiesIDS, setStoriesIDS] = useState([]);

  // const memoMaxItens = useCallback((length) => {
  //   setMaxItems(c => (c = length));
  // }, [setMaxItems]);

  useEffect(() => {
    async function AllItems() {
      const responseAll = await API.get(listType(type));
      if (responseAll.length < maxItems) {
        setMaxItems(c => (c = responseAll.length));
      }
      const slicedItems = responseAll.slice(0, maxItems);
      setStoriesIDS(slicedItems);
    }
    AllItems();
    return () => {
      setStoriesIDS([]);
    };
  }, [maxItems, setMaxItems, type]);

  return [storiesIDS];
}

export default useGetIDS;
