import React from 'react'
import styled from 'styled-components'

const LoadingBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default () => {
  return <LoadingBox>Please wait, loading...</LoadingBox>
}
