import React, { useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import parse from 'html-react-parser'
import { getArticle } from '../../actions/article'
import Info from '../general/Info'

const Wrapper = styled.section`
  position: relative;
  margin: 0 auto;
  max-width: 500px;
`

const Title = styled.h1`
  line-height: 48px;
  font-size: 40px;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 400;
  margin: 0;
`

const InformationsBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`

const Informations = styled.span`
  display: inline-block;
  margin-top: 10px;
  font-size: 16px;
`

const Img = styled.img`
  width: 100%;
`

export default () => {
  const dispatch = useDispatch()
  const article = useSelector((state) => state.article)

  useEffect(() => {
    dispatch(getArticle('fa9519d5-0363-4b8d-8e1f-627d802c08a8'))
  }, [dispatch])

  if (Object.keys(article).length === 0) {
    return <Info>Nothing to display</Info>
  }

  return (
    <Wrapper>
      <Img src={article.img} />
      <Title>{article.heading}</Title>
      <InformationsBox>
        <Informations>{article.author}</Informations>
        <Informations>{article.date}</Informations>
      </InformationsBox>
      {article.body.map(({ value, id }) => (
        <Fragment key={id}>{parse(value)}</Fragment>
      ))}
    </Wrapper>
  )
}
