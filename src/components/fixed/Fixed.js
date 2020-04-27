import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import Loading from './Loading'
import Message from './Message'

export default () => {
  const general = useSelector((state) => state.general)
  return (
    <Fragment>
      {general.loading !== 0 && <Loading />}
      {general.msg.length !== 0 &&
        general.msg.map((msg, index) => (
          <Message key={msg.id} msg={msg} index={index} />
        ))}
    </Fragment>
  )
}
