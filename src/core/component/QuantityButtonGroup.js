
import React from "react";

import { ButtonGroup, Button } from "@material-ui/core";

function QuantityButtonGroup(props) {
    const quantityArray = [15, 30, 45];
    return (
      <ButtonGroup variant="contained" size="small">
        {quantityArray.map((value, id) => {
          return (
            <Button
              color={value === props.maxItems ? "primary" : "secondary"}
              key={id}
              onClick={() => props.onClick(value)}
            >
              {value}
            </Button>
          );
        })}
      </ButtonGroup>
    );
}

export default QuantityButtonGroup;
