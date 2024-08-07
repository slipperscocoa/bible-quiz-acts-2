import React from 'react'
import './Tips.css'
import Carousel from 'react-bootstrap/Carousel'

function TipsApp () {
  return (
    <div className='tips-custom'>
      <h3>Study Tips from Veteran Quizzers:</h3>
      <br />
      <Carousel className='carousel'>
        <Carousel.Item>
          <img src='/lavender.jpg' alt='' />
          <Carousel.Caption>
            <h3>
              <i><b>
                "When I have a verse I can't seem to get, I write it out maybe
                10 times on separate pieces of paper and then tape them places
                like my mirror or laptop so I see it all the time through the
                day." --Araunah B.
                </b></i>
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src='/rose.jpg' alt='' />
          <Carousel.Caption>
            <h3>
              <i><b>
                "Memorize verse numbers along with the text. The way I do it is
                to record myself reading the portion aloud, including the verse
                numbers, and listen to it on repeat. Then when I'm reviewing, I
                flash the ASL (American Sign Language) numbers to mark the
                verses." --Eliannah B.
                </b></i>
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src='/snowball.jpg' alt='' />
          <Carousel.Caption>
            <h3>
              <i><b>
                "Be intentional about what you memorize. Week to week, it can
                sometimes feel like you have to memorize a lot of verses, but if
                you break it down, and commit to memorizing 3 verses a day (or
                however many will keep you on track), it is much more
                manageable." --Emily H.
                </b></i>
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src='/poconos.jpg' alt='' />
          <Carousel.Caption>
            <h3>
              <i><b>
                "Be intentional about when you memorize. Do it when your mind is
                freshest. If you are tired, you will only frustrate yourself
                more when you can't seem to get the verses down. I always
                memorized first thing in the morning, but you might be better
                off studying before bed. It doesn't matter what time of day it
                is, just find what works for you and stick to it." --Emily H.
                </b></i>
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src='/tree.jpg' alt='' />
          <Carousel.Caption>
            <h3>
              <i><b>
                "Before you even begin memorizing, understand what's going on in
                the passage. Seriously. I know this sounds like your mom trying
                to get you to do more work but if you understand why the text
                says what it does it will be both easier to memorize and easier
                to quiz on. Geek out over it as much as you can - I
                promise it'll make more sense and be more fun." --Eliannah B.
                </b></i>
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src='/hurst.jpg' alt='' />
          <Carousel.Caption>
            <h3>
              <i><b>
                "Be an active quizzer. It's harder to memorize when you sit
                passively reading the verse over and over and over again. Mix it
                up! Walk while you study. Read it out loud, not just in your
                head. Add motions to remember key words and thoughts. Make a
                song, or read it in an accent. Whatever you decide to do, don't
                limit memorizing to your head; include your hands, your feet,
                and your voice." --Trexton H. and Bethany S.
                </b></i>
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default TipsApp
