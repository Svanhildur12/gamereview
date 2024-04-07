"use client";
import { useState } from "react";

const GameReview = ({
  name,
  desc,
  review,
}: {
  name: string;
  desc: string;
  review: number;
}) => {
  return (
    <>
      <div> Name: {name} </div>
      <div> Desc: {desc} </div>
      <div> Review: {review || 0} </div>
    </>
  );
};

export default function Home() {
  const [reviews, setReviews] = useState({
    name: "Fifa",
    desc: "Football game",
    review: 10,
  });
  const [showReview, setShowReview] = useState(false);
  return (
    <>
      <GameReview
        name={reviews.name}
        desc={reviews.desc}
        review={reviews.review}
      />
      <div>
        <button
          style={{ border: "2px solid #ddd" }}
          onClick={() => setShowReview(true)}
        >
          New review
        </button>
      </div>
      {showReview ? (
        <>
          <div>
            Name:
            <input
              type="text"
              style={{ border: "1px solid #eee" }}
              onChange={(e) => setReviews({ ...reviews, name: e.target.value })}
            ></input>
          </div>
          <div>
            Desc:
            <input
              type="text"
              style={{ border: "1px solid #eee" }}
              onChange={(e) => setReviews({ ...reviews, desc: e.target.value })}
            ></input>
          </div>
          <div>
            Score:
            <input
              type="number"
              style={{ border: "1px solid #eee" }}
              onChange={(e) =>
                setReviews({ ...reviews, review: e.target.value })
              }
            ></input>
          </div>
        </>
      ) : null}
    </>
  );
}
