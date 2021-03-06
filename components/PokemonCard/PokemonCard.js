import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Image from "next/image";

import { Block, Card, Flex, H3 } from "../../primitives";

import Styles from "./styles";
import { isEmptyObject } from "../../utils/isEmptyUtils";
import Tag from "../Tag";
import { animated, useSpring } from "react-spring";

const PokemonCard = ({ pokemonName, pokemonUrl }) => {
  const [pokemonData, setPokemonData] = useState({});
  //   const [style, trigger] = useBoop(boopConfig);
  const [isBooped, setIsBooped] = useState(false);

  useEffect(() => {
    async function getPokemon() {
      const resp = await fetch(pokemonUrl);
      const body = await resp.json();
      setPokemonData(body);
    }
    try {
      getPokemon();
    } catch {
      console.log("no work!");
    }
  }, [pokemonName, pokemonUrl]);

  const x = 0;
  const y = 10;
  const rotation = 0;
  const scale = 1.1;
  const timing = 150;

  const style = useSpring({
    display: "inline-block",
    position: "relative",
    width: "100%",
    zIndex: isBooped ? "4" : "3",
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

  const {
    id = "",
    name = "",
    height = "",
    weight = "",
    types = [],
    sprites: { other = {} } = {},
  } = pokemonData;

  if (isEmptyObject(pokemonData)) return null;

  const pokemonImage = other?.["official-artwork"];

  return (
    <animated.div style={style}>
      <Card minHeight="200px" onClick={() => setIsBooped(!isBooped)}>
        <Flex
          column
          align="center"
          justify="space-between"
          style={{ height: "100%", width: "100%" }}
        >
          <Image
            width="150px"
            height="150px"
            src={pokemonImage?.front_default || "/images/722.png"}
          />
          <div>
            <Block bottom={4}>
              <H3>{name}</H3>
            </Block>
            <div style={{ position: "absolute", left: "8px", top: "8px" }}>
              <p>#{id}</p>
            </div>
            <Flex>
              {types.map((t, i) => {
                const { name } = t.type;
                return (
                  <Block right={2} key={i + 1000}>
                    <Tag>{name}</Tag>
                  </Block>
                );
              })}
            </Flex>
            <Block top={2}>
              <Flex>
                <p>
                  <b>Weight:</b> {weight}
                </p>
                <Block left={2}>
                  <p>
                    <b>Height:</b> {height}
                  </p>
                </Block>
              </Flex>
            </Block>
          </div>
        </Flex>
      </Card>
    </animated.div>
  );
};

PokemonCard.propTypes = {
  pokemonName: PropTypes.string.isRequired,
  pokemonUrl: PropTypes.string.isRequired,
};

export default PokemonCard;
