import React from "react";
import Head from "next/head";

const MetaTags = ({
  item,
  title,
  image,
}: {
  item: {
    title: string;
    url: string;
    keywords: string;
    description: string;
    image: string;
  };
  title: string;
  image: string;
}) => {
  return (
    <Head>
      <title>{item.title ?? title}</title>

      {item.url && <link rel="canonical" href={item.url} />}
      {item.keywords && <meta name="keywords" content={item.keywords} />}
      {item.description && (
        <meta name="description" content={item.description} />
      )}
      {item.description && (
        <meta name="og:description" content={item.description} />
      )}
      {item.title && <meta name="title" content={item.title} />}
      {item.title && (
        <meta v-if="item.title" name="og:title" content={item.title} />
      )}
      {item.image && <meta name="image" content={image} />}
      {item.image && <meta name="og:image" content={image} />}
    </Head>
  );
};

export default MetaTags;
