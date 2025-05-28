"use client";
import React from "react";
import { PlayIcon } from "./Icons";

type Props = {
  src?: string;
  url?: string;
};

const PlayVideos = ({ src, url }: Props) => {
  function playVideo() {
    const video = document.querySelector("#video") as HTMLVideoElement;
    const playBtn = document.querySelector("#playBtn") as HTMLButtonElement;

    if (video.paused === true) {
      video.play();
      playBtn.classList.add("opacity-0");
    } else {
      playBtn.classList.remove("opacity-0");

      video.pause();
    }
  }

  return (
    <div>
      {url ? (
        <iframe
          width="100%"
          height="100%"
          src={src}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className=" w-full h-full flex max-h-[90vh] relative max-w-[90vw] rounded-3xl overflow-hidden"
        ></iframe>
      ) : (
        <div className=" w-full h-full flex max-h-[90vh] relative max-w-[90vw] rounded-3xl overflow-hidden">
          <video id="video" className="w-full rounded-3xl bg-black">
            <source src={src} type="video/mp4" />
          </video>
          <button
            className="play bg-[#000000a2] absolute left-0 top-0 flex justify-center items-center w-full h-full"
            type="button"
            id="playBtn"
            onClick={playVideo}
          >
            <span className="w-16 h-16 rounded-full border text-white border-white flex justify-center items-center">
              <PlayIcon />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayVideos;
