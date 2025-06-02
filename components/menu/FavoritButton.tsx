"use client";
import { useState } from "react";
import { Button } from "../ui/button";

function FavoritButton({ isFavorit, itemId }: { isFavorit: boolean, itemId: number }) {
  const [favorit, setFavorat] = useState(isFavorit);
  const onClick = async () => {
    console.log(itemId)
    //set in the database
    setFavorat((prev) => !prev);
  };
  return (
    <Button
      variant="ghost"
      className="bg-primary/5 size-8 cursor-pointer rounded-full"
      onClick={onClick}
    >
      {favorit ? (
        <svg
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.62 17.8101C10.28 17.9301 9.72 17.9301 9.38 17.8101C6.48 16.8201 0 12.6901 0 5.6901C0 2.6001 2.49 0.100098 5.56 0.100098C7.38 0.100098 8.99 0.980098 10 2.3401C10.5138 1.64597 11.183 1.08182 11.954 0.692841C12.725 0.303859 13.5764 0.100857 14.44 0.100098C17.51 0.100098 20 2.6001 20 5.6901C20 12.6901 13.52 16.8201 10.62 17.8101Z"
            fill="#5A6AE8"
          />
        </svg>
      ) : (
        <svg
          width="26"
          height="22"
          viewBox="0 0 22 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 19.6501C10.69 19.6501 10.39 19.6101 10.14 19.5201C6.32 18.2101 0.25 13.5601 0.25 6.6901C0.25 3.1901 3.08 0.350098 6.56 0.350098C8.25 0.350098 9.83 1.0101 11 2.1901C12.17 1.0101 13.75 0.350098 15.44 0.350098C18.92 0.350098 21.75 3.2001 21.75 6.6901C21.75 13.5701 15.68 18.2101 11.86 19.5201C11.61 19.6101 11.31 19.6501 11 19.6501ZM6.56 1.8501C3.91 1.8501 1.75 4.0201 1.75 6.6901C1.75 13.5201 8.32 17.3201 10.63 18.1101C10.81 18.1701 11.2 18.1701 11.38 18.1101C13.68 17.3201 20.26 13.5301 20.26 6.6901C20.26 4.0201 18.1 1.8501 15.45 1.8501C13.93 1.8501 12.52 2.5601 11.61 3.7901C11.33 4.1701 10.69 4.1701 10.41 3.7901C9.48 2.5501 8.08 1.8501 6.56 1.8501Z"
            fill="#5A6AE8"
          />
        </svg>
      )}
    </Button>
  );
}

export default FavoritButton;
