import React, { useState } from "react";
import PropTypes from "prop-types";

import Styles from "./styles";
import FakeLink from "../FakeLink/FakeLink";
import { useRouter } from "next/router";
import { Block, Flex, Grid, GridItem, InlineBlock } from "../../primitives";
import Button from "../Button/Button";
import { animated, useSpring } from "react-spring";

const GenerationPicker = () => {
  const x = 0;
  const y = 0;
  const rotation = 0;
  const scale = 1.3;
  const timing = 150;

  const [isBooped, setIsBooped] = useState(false);

  const style = useSpring({
    display: "inline-block",
    transform: isBooped
      ? `translate(${x}px, ${y}px)
         rotate(${rotation}deg)
         scale(${scale})`
      : `translate(0px, 0px)
         rotate(0deg)
         scale(1)`,
    config: {
      tension: 300,
      friction: 10,
    },
  });
  console.log(isBooped);
  return (
    <>
      <Flex>
        <Block right={4}>
          <animated.span style={style}>
            <Button onClick={() => setIsBooped(!isBooped)}>Gen 1</Button>
          </animated.span>
        </Block>
        <Block right={4}>
          <Button>Gen 2</Button>
        </Block>
        <Block right={4}>
          <Button>Gen 3</Button>
        </Block>
        <Button>Gen 4</Button>
      </Flex>
    </>
  );
};

GenerationPicker.propTypes = {
  hideOverflow: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default GenerationPicker;
