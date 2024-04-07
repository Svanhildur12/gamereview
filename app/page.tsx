"use client";
import Image from "next/image";
import { type } from "os";
import { useState, Fragment, useCallback } from "react";
import TeamClock from "./TeamClock";
import TeamObject from "./TeamObject";
import GameReviews from "./GameReviews";

export default function Home() {
  return (
    <>
      {/*  <TeamClock /> */}
      {/*  <TeamObject /> */}
      <GameReviews />
    </>
  );
}
