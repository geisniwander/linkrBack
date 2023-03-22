import urlMetadata from "url-metadata";

/*
    format:
    [
        {
            url: "http://example.com"
            meta: {
                    title: (...)
                    image: (...)
                    ...
                   }
        },
        (...)
    ]
        
*/

const metaDataCache = [];

export async function addMetaData(posts) {
  try {
    for (const post of posts) {
      let record = metaDataCache.find((record) => record.url === post.url);
      let metaData;
      if (!record) {
        metaData = await urlMetadata(post.url);
        metaDataCache.push({ url: post.url, meta: metaData });
      } else {
        metaData = record.meta;
      }
      post.title = metaData?.title;
      post.image = metaData?.image;
      post.description = metaData?.description;
    }
  } catch (error) {
    console.log(error);
  }
}
