"use client";
import Image from "next/image";
import { type } from "os";
import { useState, Fragment, useCallback } from "react";

type HeaderProps = {};

const Header = (props: HeaderProps) => {
  return <div>Game clock</div>;
};

const Team = ({ name, score }: { name: string; score: number }) => {
  return (
    <>
      <div> Name: {name} </div>
      <div> Score: {score || 0} </div>
    </>
  );
};

export default function Home() {
  const [teamScore1, updateTeamScore1] = useState(0);
  const [teamName, changeTeamName] = useState("Team name 1");
  const [buttonChangeteam, changeButtonTeamName] = useState(false);

  return (
    <div>
      <Header />
      <Team name={teamName} score={teamScore1}></Team>
      Change team name:
      {buttonChangeteam ? (
        <>
          <input
            style={{ border: "1px solid #ddd" }}
            type="text"
            placeholder="team name"
            onChange={(e) => changeTeamName(e.target.value)}
          ></input>
          <button
            style={{ border: "1px solid #eee" }}
            onClick={() => changeButtonTeamName(false)}
          >
            save
          </button>
        </>
      ) : (
        <button
          style={{ border: "1px solid #eee" }}
          onClick={() => changeButtonTeamName(true)}
        >
          Change team name
        </button>
      )}
      <Team name="Team 2" score={4}></Team>
      Change Team Score 1:
      <input
        style={{ border: "1px solid #ddd" }}
        type="number"
        placeholder="update score"
        onChange={(e) => updateTeamScore1(parseInt(e.target.value))}
      ></input>
    </div>
  );
}
