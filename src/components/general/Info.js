import React from 'react'
import styled from 'styled-components'

const InfoBox = styled.div`
  padding: 20px 0;
  text-align: center;
`

export default ({ children }) => {
  return <InfoBox>{children}</InfoBox>
}
