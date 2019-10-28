import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import API from '../services'

import { 
  Grid,
  Container, 
  Box,
  List,
} from "@material-ui/core"

import NewsLayout from "../layout/NewsLayout";
import NewsPreview from "../component/NewsPreview";
import LoadingProgress from "../component/LoadingProgress";
import QuantityButtonGroup from "../component/QuantityButtonGroup";

import { makeStyles } from '@material-ui/core/styles';

const NewsBoxStyle = makeStyles(theme => 
({
  boxListStyle: {
    backgroundColor: theme.palette.secondary.main,
  }
})
);

// Loading math to determinate progress
function loadingProgressMath(value, itemCount) {
  return value / itemCount * 100
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

function NewsList(props) {
  const newsBoxClasses = NewsBoxStyle();
  const [loadingContent, setLoading] = useState(true);
  const [maxItems, setMaxItems] = useState(15)

  const [storiesIDS, setStoriesIDS] = useState([])
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
  const [newsList, setNewsList] = useState([])
  useEffect(() => {
    async function getItemsInformation() {
      storiesIDS.forEach(async (value, index) => {
        const item = await API.get("item/" + value + ".json");
        setLoadingProgress((c) => c + 1);
        setNewsList((n) => [...n, item])
      })
    }

    if (storiesIDS.length > 0) {
      getItemsInformation()
    }
  }, [storiesIDS])

  useEffect(() => {
    if (
      loadingProgressMath(loadingProgress, maxItems) >= 95
    ) {
      setLoading(false);
      setLoadingProgress(0);
    }
  }, [loadingProgress, maxItems]);

  const ListToggle = () => {
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
      <LoadingProgress value={loadingProgressMath(loadingProgress, maxItems)}></LoadingProgress>
    );
  };

  return (
    <NewsLayout pageName="News" location={props.location}>
      <Container>
        <Grid container justify="flex-start">
          <Box className={newsBoxClasses.boxListStyle} p={2} width={1}>
            <Box display="flex" justifyContent="flex-end">
              <QuantityButtonGroup
                onClick={value => setMaxItems(value)}
                maxItems={maxItems}
              />
            </Box>

            {ListToggle()}
          </Box>
        </Grid>
      </Container>
    </NewsLayout>
  );
}

export default NewsList;
