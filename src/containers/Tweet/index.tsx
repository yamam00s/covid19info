import React, { FC, useState } from 'react'
import TweetMain from 'components/Tweet'

const TweetContainer: FC = () => {
  const [userName, setUserName] = useState('MHLWitter')

  return <TweetMain userName={userName} />
}

export default TweetContainer
