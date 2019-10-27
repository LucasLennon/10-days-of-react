import React from 'react';

import {
  Box,
  Link,
  ListItem,
  Typography,
  ButtonGroup,
  Button,
} from "@material-ui/core"

function NewsPreview(props) {

  function pointsLabel() {
    if (props.info.score > 1) {
      return 'points'
    }
    return 'point'
  }
  function commentsLabel() {
    if (props.info.descendants > 1) {
      return 'comments'
    }
    return 'comment'
  }

  if (!props.info.dead) {
    console.log(props);
    
    return (
      <ListItem>
        <Box display="flex" flexWrap="wrap" width={1}>
          <Box display="flex" width={1}>
            <Link href={
              (props.info.url) ? props.info.url : `/news/${props.info.id}`
            } variant="body1">
              {props.id}.
              {props.info.title}
              <Box display="inline" mx={1}>
                <Typography variant="caption" mx={1}>
                  ({props.info.url})
                </Typography>
              </Box>
            </Link>
          </Box>
          <Box display="inline">
            <ButtonGroup variant="contained" size="small" aria-label="small contained button group">
              <Button>
                {new Date(props.info.time).toLocaleString('en-US', { timeStyle: "short" })}
              </Button>
              <Button onClick={() => props.hideItem(props.info.id)}>
                hide
              </Button>
              <Button href={`/news/${props.info.id}`}>
                {props.info.descendants} {commentsLabel()}
              </Button>
            </ButtonGroup>

            <Box display="inline" mx={1}>
              <Typography variant="caption">
                {props.info.score} {pointsLabel()} from <Link> {props.info.by} </Link>
              </Typography>
            </Box>

          </Box>
        </Box>
      </ListItem>
    );
  }
}

export default NewsPreview;
