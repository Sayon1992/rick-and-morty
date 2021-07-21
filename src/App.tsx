import { Container, Grid, makeStyles } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { Episode } from "../core/entities/Episode";
import EpisodeCard from "./components/EpisodeCard";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    marginTop: "3%",
    marginBottom: "5%",
  },
});

function App() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  const getEpisodes = useCallback(
    async (url: string = "https://rickandmortyapi.com/api/episode") => {
      const response = await fetch(url);
      const resData = await response.json();
      setEpisodes((prevState) => [...prevState, ...resData.results]);
      (await resData.info.next) && getEpisodes(resData.info.next);
    },
    []
  );

  useEffect(() => {
    getEpisodes();
  }, [getEpisodes]);

  return (
    <main className={useStyles().root}>
      <Container>
        <h1 className={useStyles().title}>Rick and Morty Episodes</h1>
        <h2 className={useStyles().subtitle}>Episodes</h2>
        <Grid container spacing={5}>
          {episodes.map((episode) => (
            <Grid item md={4} lg={3} sm={6} xs={12}>
              <EpisodeCard episode={episode} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}

export default App;
