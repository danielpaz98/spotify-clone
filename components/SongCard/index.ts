"use client";

// COMPONENTS
import SongCard from "./SongCard";
import Image from "./SongCardImage";
import Title from "./SongCardTitle";
import Author from "./SongCardAuthor";
import { PlayButton } from "@/components";

export default Object.assign(SongCard, {
  Image,
  Title,
  Author,
  PlayButton,
});
