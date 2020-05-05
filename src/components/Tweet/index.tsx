import React, { FC } from 'react'

const TweetMain: FC<{ userName : string }>= ({ userName }) => (
  <div>
    <a
      className="twitter-timeline"
      data-lang="ja"
      data-theme="dark"
      data-width="300"
      data-height="1000"
      href={`https://twitter.com/${userName}?ref_src=twsrc%5Etfw`}
    ></a>
    <script async src="https://platform.twitter.com/widgets.js"></script>
  </div>
)

export default TweetMain
