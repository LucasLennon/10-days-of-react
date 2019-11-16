import React, { useEffect, useState } from "react";

import useGetIDS from "../hooks/useGetIDS";
import useGetItems from "../hooks/useGetItems";
import useLoading from "../hooks/useLoading";

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

function NewsPage(props) {
  const newsBoxClasses = NewsBoxStyle();
  const [maxItems, setMaxItems] = useState(15);
  const [storiesIDS] = useGetIDS(
    maxItems,
    props.location.pathname,
    setMaxItems
  );

  const [itemsList] = useGetItems(storiesIDS, maxItems);

  const [
    { loadingState },
    { loadingStateProgress, setLoadingProgress }
  ] = useLoading({
    state: true,
    progress: 0
  });
  useEffect(() => {
    function update() {
      if (loadingProgressMath(loadingStateProgress, maxItems) >= 100) {
        setLoadingProgress(c => (c = 0));
      } else {
        setLoadingProgress(c => (c += 1));
      }
    }
    update();
  }, [itemsList.length]);

  const toggleList = () => {
    if (loadingState === false) {
      return (
        <List>
          {itemsList.map((item, key) => {
            return <NewsPreview info={item} id={key + 1} key={key + 1} />;
          })}
        </List>
      );
    }
    return (
      <LoadingProgress
        value={loadingProgressMath(loadingStateProgress, maxItems)}
      ></LoadingProgress>
    );
  };

  function toggleQuantityButtons() {
    if (storiesIDS.length > 14 && loadingState === false) {
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
      loading={loadingState}
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
