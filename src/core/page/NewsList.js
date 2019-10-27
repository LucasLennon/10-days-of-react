import React, { useEffect, useState } from 'react';
// import {
//   Link,
// } from "react-router-dom";

import API from '../services'

import { 
  Grid,
  Container, 
  Box,
  List,
  ButtonGroup,
  Button,
} from "@material-ui/core"

import NewsPreview from "../component/NewsPreview";
import LoadingProgress from "../component/LoadingProgress";

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

function NewsList() {
  const newsBoxClasses = NewsBoxStyle();
  const [loadingContent, setLoading] = useState(true);
  const [maxItems, setMaxItems] = useState(15)

  const [storiesIDS, setStoriesIDS] = useState([])
  useEffect(() => {
    async function AllItems() {
      const responseAll = await API.get("topstories.json");
      const slicedItems = responseAll.slice(0, maxItems);
      setStoriesIDS(slicedItems)
    }
    AllItems()
    return () => {
      setLoading(true);
      setLoadingProgress(0);
      setNewsList([]);
      setStoriesIDS([]);
    };
  }, [maxItems])

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
    if (loadingProgressMath(loadingProgress, maxItems) >= 95) {
      setLoading(false);
      setLoadingProgress(0);
    }
  }, [loadingProgress, maxItems])

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
    <Container>
      <Grid container justify="flex-start">
        <Box className={newsBoxClasses.boxListStyle} p={2} width={1}>

          <ButtonGroup variant="contained" size="small">
            {
              [15, 30, 45].map((value, id) => {
                return (
                  <Button
                    color={value === maxItems ? "primary" : "secondary"}
                    key={id}
                    onClick={() => setMaxItems(value)}
                  >
                    {value}
                  </Button>
                );
              })
            }
          </ButtonGroup>
          
          {
            ListToggle()
          }
          
        </Box>
      </Grid>
    </Container>
  );
}

export default NewsList;
