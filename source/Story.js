import React from 'react';
import styled from 'styled-components';

import DocumentEvent from './DocumentEvent';
import $ from 'jquery';

const Story = styled.div`
  width: 400px;
  align-self: center;
  margin-right: 300px;
  margin-top: 40px;
  margin-bottom: 40px;

  font-family: arial;
  font-size: 18px;
`

const Section = styled.div`
  transition: all .5s;
  display: flex;
  flex-direction: column;

  align-self: center;

  min-width: ${p => p.active ? '100vw' : '0'};
  height: ${p => p.active ? '100vh' : '50px'};
  font-family: arial;
  overflow: ${p => p.active ? 'auto' : 'hidden'};

  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 50px;
  padding-right: 50px;

  border: solid 3px black;
  cursor: pointer;

  > div {
    display: flex;
    flex-direction: column;

    width: 700px;
    align-self: center;
    pointer-events: none;
  }

  .section-header {
    position: absolute;
    font-weight: bold;
    font-size: 20px;
    width: 700px;
    height: 44px;
    margin-top: -10px;
    padding-top: 10px;
    background-color: white;
  }

  .section-content {
    display: flex;
    flex-direction: column;
    line-height: 25px;
    margin-top: 50px;
    padding-bottom: 200px;

    & > *:last-child {
      margin-bottom: 100px;
    }
  }

  small, b {
    font-family: hanshand;
  }
`

const texts = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at convallis nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean dolor ipsum, elementum vitae gravida vel, placerat eu leo. Sed ultrices quis justo non fermentum. Etiam scelerisque, elit eu finibus ornare, tellus libero dictum mauris, sed ornare sem elit non turpis. Sed lobortis quis lacus nec congue. Nam a orci in diam luctus congue. Quisque congue tortor quam, a auctor nis  dictum vel.`,
  `Aliquam erat volutpat. Ut quis cursus dolor. Donec nec ipsum quis velit facilisis rutrum nec at diam. Pellentesque vitae diam diam. Pellentesque ut suscipit eros. Donec felis lacus, auctor in feugiat nec, suscipit rutrum justo. Pellentesque commodo condimentum nibh, non tempus libero suscipit sed. Proin et velit in velit lacinia scelerisque. Aliquam nec quam consequat, fermentum felis ac, varius eros. Etiam commodo molestie risus. Nam nec cursus diam.`,
  `Sed ullamcorper leo ac metus luctus, eget tincidunt elit interdum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse congue cursus massa, vel mattis magna iaculis vel. In id quam tortor. Morbi tincidunt sagittis massa non pretium. In accumsan metus dui, id ultrices ligula posuere ut. Sed arcu tortor, rutrum quis est ut, finibus pretium tortor. Suspendisse at convallis ipsum. Praesent vulputate congue cursus. Quisque tempus turpis interdum augue euismod pharetra. Vivamus at viverra augue, eget tempor purus. Nulla eu eros pulvinar, sagittis mauris id, varius dolor. Quisque vitae tristique metus, a sagittis erat.`,
]

const EventBar = styled.div`
  width: 800px;
  align-self: center;
  border-bottom: solid 1px black;

  padding-left: 50px;
  padding-right: 50px;
  padding-top: 10px;
  padding-bottom: 10px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

class Book extends React.Component {
  state = {
    sidestory: null,
    scrolling: false,
    topPosition: 0,
  }

  render() {
    const { sidestory, scrolling, topPosition } = this.state;

    const handleClick = (e) => {
      const id = e.target.id;

      if (sidestory === id) {
        this.setState({ sidestory: null });
      }
      else {
        this.setState({
          sidestory: id,
          scrolling: true,
          topPosition: $(e.target).offset().top,
        });
        e.target.scrollTop = 0;
        $("body").animate({
          scrollTop: $(e.target).offset().top,
        }, {
          complete: () => {
            setTimeout(() => {
              this.setState({
                scrolling: false,
              });
            }, 100);
          },
        });
      }
    }

    return (
      <div
        style={{
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
        }}
      >

        { !scrolling && sidestory !== null &&
          <DocumentEvent passive
            name="scroll"
            handler={(e) => {
              const documentScroll = document.body.scrollTop
              const diff = documentScroll - topPosition;

              // Stop timeout/animation
              clearTimeout(this.timeout);
              $("body").stop();

              if (Math.abs(diff) > 200) {
                this.setState({ sidestory: null });
                if (diff > 0) {
                  // If scrolled DOWN
                  $("body").animate({
                    scrollTop: topPosition - 100,
                  });
                }
              }
              else if (topPosition !== documentScroll) {
                // If, after a second, the scroll hasn't changed,
                // bounce it back
                this.timeout = setTimeout(() => {
                  this.setState({ scrolling: true });
                  $("body").animate({
                    scrollTop: topPosition,
                  }, {
                    complete: () => {
                      this.setState({ scrolling: false });
                    },
                  });
                }, 500)
              }
            }}
          />
        }

        <Story>
          <b>The Buch Brothers</b> is a Kombucha tea microbrewery based in Amsterdam and comprised of three chefs:
          Nicolas, Thijs and Clint.
          We discovered our shared vision following a chance encounter in the kitchen of Café de Ceuvel, Amsterdam North,
          and created a company that encompasses our convictions on the improtance of food, the body and nature.
        </Story>

        <Section
          id="who"
          active={sidestory === 'who'}
          onClick={handleClick}
        >
          <div>
            <div className="section-header">who are the buch brothers</div>

            <div className="section-content">
              <div>
                <img
                  src="https://image.jimcdn.com/app/cms/image/transf/dimension=319x10000:format=jpg/path/sfd94ba26fe3a9431/image/i983060b67a75338c/version/1487082743/jasmine-k-kombucha-green-tea-amsterdam-healthy-organic-the-buch-brothers-local-green-organic-jasmine-tea.jpg"
                  style={{
                    height: 300,
                  }}
                />

                <img
                  src="https://image.jimcdn.com/app/cms/image/transf/dimension=259x10000:format=jpg/path/sfd94ba26fe3a9431/image/i973bf4d61922a853/version/1487082726/jasmine-k-kombucha-green-tea-amsterdam-healthy-organic-the-buch-brothers-local-green-organic-jasmine-tea.jpg"
                  style={{
                    height: 300,
                  }}
                />

                <img
                  src="https://image.jimcdn.com/app/cms/image/transf/dimension=227x10000:format=jpg/path/sfd94ba26fe3a9431/image/i16d48cdccc540f66/version/1487082753/jasmine-k-kombucha-green-tea-amsterdam-healthy-organic-the-buch-brothers-local-green-organic-jasmine-tea.jpg"
                  style={{
                    height: 300,
                  }}
                />
              </div>

              <small>Photo of the three chefs</small>

              <p>
                <b>The Buch Brothers</b> is a Kombucha tea microbrewery based in Amsterdam and comprised of three chefs:
                Nicolas, Thijs and Clint.
                We discovered our shared vision following a chance encounter in the kitchen of Café de Ceuvel, Amsterdam North,
                and created a company that encompasses our convictions on the improtance of food, the body and nature.
              </p>

              <p>
                We believe that food production is a living system that needs to be treated with as much care and nurture as the human body. Emphasising the craftmanship at the heart of our production, we believe that food can be an artistic process and want to create ethical links between product, consumer and nature.
              </p>
              <p>
                <b>The Buch Brothers</b> is a Kombucha tea microbrewery based in Amsterdam and comprised of three chefs:
                Nicolas, Thijs and Clint.
                We discovered our shared vision following a chance encounter in the kitchen of Café de Ceuvel, Amsterdam North,
                and created a company that encompasses our convictions on the improtance of food, the body and nature.
              </p>

              <p>
                We believe that food production is a living system that needs to be treated with as much care and nurture as the human body. Emphasising the craftmanship at the heart of our production, we believe that food can be an artistic process and want to create ethical links between product, consumer and nature.
              </p>

              <p>
                <b>The Buch Brothers</b> is a Kombucha tea microbrewery based in Amsterdam and comprised of three chefs:
                Nicolas, Thijs and Clint.
                We discovered our shared vision following a chance encounter in the kitchen of Café de Ceuvel, Amsterdam North,
                and created a company that encompasses our convictions on the improtance of food, the body and nature.
              </p>

              <p>
                <b>The Buch Brothers</b> is a Kombucha tea microbrewery based in Amsterdam and comprised of three chefs:
                Nicolas, Thijs and Clint.
                We discovered our shared vision following a chance encounter in the kitchen of Café de Ceuvel, Amsterdam North,
                and created a company that encompasses our convictions on the improtance of food, the body and nature.
              </p>
            </div>
          </div>
        </Section>

        <Story>
          Kombucha is a fermented tea created with a living organism called a SCOBY, a symbiotic culture of bacterias and yeasts, that when combined with tea begins to ferment. It has been known for it's health benefits, containing probiotic qualities that assist nutrient absorbtion as well as boosting immunity, or help your body draining off chemicals from your body. We use only organic ingredients. At The Buch Brothers we take taste as our starting point, brewing Kombucha with a range of flavours that are seasonal, subtle and varied.
        </Story>

        <Section
          id="what"
          active={sidestory === 'what'}
          onClick={handleClick}
        >
          <div>
            <div className="section-header">what is kombucha</div>

            <div className="section-content">
              <div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <img
                    src="https://image.jimcdn.com/app/cms/image/transf/dimension=211x1024:format=jpg/path/sfd94ba26fe3a9431/image/i2c8fc8bcfb4f61c3/version/1487076616/jasmine-k-the-buch-brothers-fermented-tea-jasmine-tea-green-tea-health-raw-kombucha-amsterdam.jpg"
                    alt="Jasmine K, The Buch Brothers, fermented tea, Jasmine tea, green tea, health, raw kombucha"
                    style={{
                      height: 500,
                      flexShrink: 0,
                      marginRight: 30,
                    }}
                  />

                  <div>
                    Our raw Jasmine K, won't give you any immortality gift because we are still trying it out on our self but a lot of pleasure while drinking it. Our Jasmine K is unpasteurized, made of green jasmine tea (organic) and white refined beetrootsugar (organic). After 11days of fermentation on a fust, and couple of more in the bottle to carbonate the drink we obtain a sparkling fermented tea ready to drink -cold or room temperature. It can be served straight from the bottle or use to make cocktails.<br /><br />

                    Champagne or wine glass are indicate to serve the Kombucha, you can have a clear look at the drink itself but also helps to appreciate all the aromas of the drink.
                    The Kombucha can replace any ginger ale or sparkling soda on your cocktail, you will have the same sparkling level, with less sweet after taste, new tea flavors, jasmine flowers, natural well balanced sweet & acidity,
                  </div>
                </div>

                <div style={{ marginTop: 30 }}>
                  <b>Look:</b> pale gold with light green reflects<br />
                  <b>Smell:</b> jasmine and white fruits<br />
                  <b>Taste:</b> flowery attack, warm apricot and peach, smooth acidity that brings citrus aromas, light bitterness at the end with the green tea hit, retro-olfaction on the english bonbon.<br />
                  <b>Bubble:</b> creamy and supple<br />
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Story>
          Kombucha production is a delicate process and at The Buch Brothers we are always experimenting with new and exiting flavours. We begin by creating the tea, combining carefully chosen organic ingredients with water. Then we introduce the Scoby, the symbiotic culture of yeasts and bacterias that initiates the fermentation process. It can take 1-3 weeks to produce kombucha tea depending on the desired flavour.
          We package the product ourselves with bottles containing artwork from artists.
        </Story>

        <Section
          id="artists"
          active={sidestory === 'artists'}
          onClick={handleClick}
        >
          <div>
            <div className="section-header">artists</div>

            <div className="section-content">
              Aliquam erat volutpat. Ut quis cursus dolor. Donec nec ipsum quis velit facilisis rutrum nec at diam. Pellentesque vitae diam diam. Pellentesque ut suscipit eros. Donec felis lacus, auctor in feugiat nec, suscipit rutrum justo. Pellentesque commodo condimentum nibh, non tempus libero suscipit sed. Proin et velit in velit lacinia scelerisque. Aliquam nec quam consequat, fermentum felis ac, varius eros. Etiam commodo molestie risus. Nam nec cursus diam.
            </div>
          </div>
        </Section>

        <Story children={texts[0]} />

        <Section
          id="events"
          active={sidestory === 'events'}
          onClick={handleClick}
        >
          <div>
            <div className="section-header">events</div>

            <div className="section-content">
              Kambucha and blabla
            </div>
          </div>
        </Section>

        { [{
            title: 'Sandberg Institute Open Day',
            date: 'Februari 2nd',
          }, {
            title: 'Otemba Sushi Sessions',
            date: 'March 26th',
          }].map((x, i) =>
            <EventBar key={i}>
              <div>{x.title}</div>
              <div>{x.date}</div>
            </EventBar>
          )
        }


        <Story children={texts[1]} />

        <Section
          id="selling"
          active={sidestory === 'selling'}
          onClick={handleClick}
        >
          <div>
            <div className="section-header">selling points</div>

            <div className="section-content">
              Aliquam erat volutpat. Ut quis cursus dolor. Donec nec ipsum quis velit facilisis rutrum nec at diam. Pellentesque vitae diam diam. Pellentesque ut suscipit eros. Donec felis lacus, auctor in feugiat nec, suscipit rutrum justo. Pellentesque commodo condimentum nibh, non tempus libero suscipit sed. Proin et velit in velit lacinia scelerisque. Aliquam nec quam consequat, fermentum felis ac, varius eros. Etiam commodo molestie risus. Nam nec cursus diam.
            </div>
          </div>
        </Section>

        <Story children={texts[2]} />

        <Section
          id="line"
          active={sidestory === 'line'}
          onClick={handleClick}
        >
          <div>
            <div className="section-header">product line</div>

            <div className="section-content">
              Aliquam erat volutpat. Ut quis cursus dolor. Donec nec ipsum quis velit facilisis rutrum nec at diam. Pellentesque vitae diam diam. Pellentesque ut suscipit eros. Donec felis lacus, auctor in feugiat nec, suscipit rutrum justo. Pellentesque commodo condimentum nibh, non tempus libero suscipit sed. Proin et velit in velit lacinia scelerisque. Aliquam nec quam consequat, fermentum felis ac, varius eros. Etiam commodo molestie risus. Nam nec cursus diam.
            </div>
          </div>
        </Section>

        <Story children={texts[0]} />

        <Section
          id="partners"
          active={sidestory === 'partners'}
          onClick={handleClick}
        >
          <div>
            <div className="section-header">partners</div>

            <div className="section-content">
              Aliquam erat volutpat. Ut quis cursus dolor. Donec nec ipsum quis velit facilisis rutrum nec at diam. Pellentesque vitae diam diam. Pellentesque ut suscipit eros. Donec felis lacus, auctor in feugiat nec, suscipit rutrum justo. Pellentesque commodo condimentum nibh, non tempus libero suscipit sed. Proin et velit in velit lacinia scelerisque. Aliquam nec quam consequat, fermentum felis ac, varius eros. Etiam commodo molestie risus. Nam nec cursus diam.
            </div>
          </div>
        </Section>

        <Story children={texts[1]} />
      </div>
    );
  }
}

export default Book;
