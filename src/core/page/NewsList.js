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
  LinearProgress,
} from "@material-ui/core"

import NewsPreview from "../component/NewsPreview";

import { makeStyles } from '@material-ui/core/styles';

const NewsBoxStyle = makeStyles(theme => 
({
  boxListStyle: {
    backgroundColor: theme.palette.secondary.main,
  }
})
);

function NewsList() {
  const newsBoxClasses = NewsBoxStyle();
  const [loadingContent, setLoading] = useState(true);
  const [maxItems, setMaxItems] = useState(15)

  const [storiesIDS, setStoriesIDS] = useState([])
  useEffect(() => {
    setLoading(true);
    async function AllItems() {
      const responseAll = await API.get("newstories.json");
      const slicedItems = responseAll.slice(0, maxItems);
      setStoriesIDS(slicedItems)
    }
    AllItems()
    return function cleanup() {
      setLoadingProgress(0);
      setNewsList([]);
      setStoriesIDS([]);
    };
  }, [maxItems])

  const [newsList, setNewsList] = useState([])
  useEffect(() => {
    async function getItemsInformation() {
      let itemsGetted = [];
      await new Promise(resolve => {

        storiesIDS.forEach(async (value,index) => {
          const item = await API.get("item/" + value + ".json");
          itemsGetted.push(item)
          if (storiesIDS[index] === storiesIDS[storiesIDS.length - 1]) {
            resolve()
          }
        })

      })
      setNewsList(itemsGetted)
      // setLoading(false);
    }

    if (storiesIDS.length > 0) {
      getItemsInformation()
    }
  }, [storiesIDS])

  const [loadingProgress, setLoadingProgress] = useState(0);
  // useEffect(() => {
  //   if (loadingProgress === 100) {
  //     setLoading(false);
  //   }
  //   else{
  //     setLoadingProgress(loadingProgress + 1);
  //   }
  //   return function cleanup(){
  //     setLoadingProgress(0)
  //   }
  // }, [loadingProgress, newsList])

  const ItemList = () => {
    if (loadingContent === false) {
      return (
        <List>
          {newsList.map(item => {
            return <NewsPreview info={item} key={item.id} />;
          })}
        </List>
      );
    }
    return (
      <Box my={2}>
        {/* valueBuffer={(maxItems / 100) * 100} */}
        {/* <LinearProgress variant="buffer" value={loadingProgress} valueBuffer={( loadingProgress / 100 ) * 100}></LinearProgress> */}
        <LinearProgress variant="determinate" value={loadingProgress}></LinearProgress>
      </Box>
    );
  };

  return (
    <Container>
      <Grid container justify="flex-start">
        <Box className={newsBoxClasses.boxListStyle} p={2} width={1}>
          <ButtonGroup variant="contained" size="small">
            {[15, 30, 45].map((value, id) => {
              return (
                <Button
                  color={value === maxItems ? "primary" : "secondary"}
                  key={id}
                  onClick={() => setMaxItems(value)}
                >
                  {value}
                </Button>
              );
            })}
          </ButtonGroup>
          
          {ItemList()}
          
        </Box>
      </Grid>
    </Container>
  );
}

export default NewsList;
