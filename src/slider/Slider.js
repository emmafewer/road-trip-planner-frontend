/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect, useRef } from 'react'
import { css, jsx } from '@emotion/react'
import SliderContent from './SliderContent'
import Slide from './Slide'
import Arrow from './Arrow'
import {connect} from 'react-redux'

/**
 * @function Slider
 */

const Slider = props => {
  console.log(props.slides)
  const getWidth = () => window.innerWidth

  const [state, setState] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.45
  })

  const { translate, transition, activeIndex } = state
  const autoPlayRef = useRef()

  useEffect(() => {
    autoPlayRef.current = nextSlide
  })

  useEffect(() => {
    const play = () => {
      autoPlayRef.current()
    }
    const interval = setInterval(play, props.autoPlay * 1000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    if (activeIndex === props.slides.length - 1) {
      return setState({
        ...state,
        translate: 0,
        activeIndex: 0
      })
    }

    setState({
      ...state,
      activeIndex: activeIndex + 1,
      translate: (activeIndex + 1) * getWidth()
    })
  }

  const prevSlide = () => {
    if (activeIndex === 0) {
      return setState({
        ...state,
        translate: (props.slides.length - 1) * getWidth(),
        activeIndex: props.slides.length - 1
      })
    }

    setState({
      ...state,
      activeIndex: activeIndex - 1,
      translate: (activeIndex - 1) * getWidth()
    })
  }

  return (
    <div css={SliderCSS}>
      <h2 style={{backgroundColor: "black", color: "white", width: "100%", textAlign: "center"}}>Park Planner is designed for you to easily search and save parks and campgrounds you'd like to visit.</h2>
      <SliderContent
        translate={translate}
        transition={transition}
        width={getWidth() * props.slides.length}
      >
        {props.slides.map((slide, i) => (
          <Slide key={slide + i} content={slide} />
        ))}
      </SliderContent>
      

      {!props.autoPlay && (
        <>
          <Arrow direction="left" handleClick={prevSlide} />
          <Arrow direction="right" handleClick={nextSlide} />
        </>
      )}
    </div>
  )
}

Slider.defaultProps = {
  slides: [],
  autoPlay: null
}

const SliderCSS = css`
  position: relative;
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  overflow: hidden;
`

const mapStateToProps = state => {
  return {
      state: state
  }
}

export default connect(mapStateToProps)(Slider)