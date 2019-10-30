import React, { useEffect, useState } from "react";

import { Grid, Container, Box, List } from "@material-ui/core";

import NewsLayout from "../../../core/layout/NewsLayout";
import LoadingProgress from "../../../core/component/LoadingProgress";
import QuantityButtonGroup from "../../../core/component/QuantityButtonGroup";

import NewsPreview from "../component/NewsPreview";
import API from "../services";

import { makeStyles } from "@material-ui/core/styles";

const NewsBoxStyle = makeStyles(theme => ({
  boxListStyle: {
    backgroundColor: theme.palette.secondary.main
  }
}));

// Loading math to determinate progress
function loadingProgressMath(value, itemCount) {
  return (value / itemCount) * 100;
}

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

function NewsPage(props) {
  const newsBoxClasses = NewsBoxStyle();

  const [loadingContent, setLoading] = useState(true);
  const [maxItems, setMaxItems] = useState(15);

  const [storiesIDS, setStoriesIDS] = useState([]);
  useEffect(() => {
    async function AllItems() {
      const responseAll = await API.get(listType(props.location.pathname));
      if (responseAll.length < maxItems) {
        setMaxItems(responseAll.length);
      }
      const slicedItems = responseAll.slice(0, maxItems);
      setStoriesIDS(slicedItems);
    }
    AllItems();
    return () => {
      setLoading(true);
      setLoadingProgress(0);
      setNewsList([]);
      setStoriesIDS([]);
    };
  }, [maxItems, props.location.pathname]);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [newsList, setNewsList] = useState([]);
  useEffect(() => {
    async function getItemsInformation() {
      storiesIDS.forEach(async (value, index) => {
        const item = await API.get("item/" + value + ".json");
        setLoadingProgress(c => c + 1);
        if (!!item) {
          setNewsList(n => [...n, item]);
        }
      });
    }

    if (storiesIDS.length > 0) {
      getItemsInformation();
    }
  }, [storiesIDS]);

  useEffect(() => {
    function hideLoading() {
      setLoading(false);
      setLoadingProgress(0);
    }
    if (loadingProgressMath(loadingProgress, maxItems) >= 95) {
      hideLoading();
    }
  }, [loadingProgress, maxItems]);

  const toggleList = () => {
    if (loadingContent === false) {
      return (
        <List>
          {newsList.map((item, key) => {
            return <NewsPreview info={item} id={key + 1} key={key + 1} />;
          })}
        </List>
      );
    }
    return (
      <LoadingProgress
        value={loadingProgressMath(loadingProgress, maxItems)}
      ></LoadingProgress>
    );
  };

  function toggleQuantityButtons() {
    if (storiesIDS.length > 14 && loadingContent === false) {
      return (
        <QuantityButtonGroup
          onClick={value => setMaxItems(value)}
          maxItems={maxItems}
        />
      );
    }
    return "";
  }

  return (
    <NewsLayout
      pageName="News"
      location={props.location}
      loading={loadingContent}
    >
      <Container>
        <Grid container justify="flex-start">
          <Box className={newsBoxClasses.boxListStyle} p={2} width={1}>
            <Box display="flex" justifyContent="flex-end">
              {toggleQuantityButtons()}
            </Box>
            {toggleList()}
          </Box>
        </Grid>
      </Container>
    </NewsLayout>
  );
}

export default NewsPage;
