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
  Typography,
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

  const [totalItems, setTotalItems] = useState([])
  useEffect(() => {
    setLoading(true);
    async function AllItems() {
      const responseAll = await API.get("newstories.json");
      const slicedItems = responseAll.slice(0, maxItems);
      setTotalItems(slicedItems)
    }
    AllItems()
    return function cleanup() {
      setNewsList([]);
      setTotalItems([]);
    };
  }, [maxItems])

  const [newsList, setNewsList] = useState([])
  useEffect(() => {
    async function getItemsInformation(params) {
      let itemsGetted = [];
      await new Promise(resolve => {

        totalItems.forEach(async (value,index) => {
          const item = await API.get("item/" + value + ".json");
          itemsGetted.push(item)
          if (totalItems[index] === totalItems[totalItems.length - 1]) {
            resolve()
          }
        })

      })
      // console.log('outside eita', itemsGetted.length);
      setNewsList(itemsGetted)
      setLoading(false);
    }

    if (totalItems.length > 0) {
      getItemsInformation()
    }
  }, [totalItems])

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
      <Typography>
        Loading
      </Typography>
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
          

          {
            ItemList()
          }
          
        </Box>
      </Grid>
    </Container>
  );
}

export default NewsList;
