import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout/Layout"
import SEO from "../components/seo/Seo"
import {
  Wrapper,
  Image,
  BottomEdgeDown,
  BottomEdgeUp,
  Game,
} from "../pageStyles/pageStyles"
import { COLORS } from "../constants"

const IndexPage = () => {
  const {
    wpcontent: {
      page: {
        homepageMeta: {
          title,
          description,
          featuredGames,
          bannerImage,
        },
      },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "Home", idType: URI) {
          homepageMeta {
            title
            description
            featuredGames {
              ... on WPGraphql_Game {
                gameMeta {
                  description
                  name
                  publisher
                  releaseYear
                  image {
                    altText
                    sourceUrl
                    imageFile {
                      childImageSharp {
                        fluid(quality: 50, grayscale: true) {
                          ...GatsbyImageSharpFluid_withWebp
                        }
                      }
                    }
                  }
                }
                slug
              }
            }
            bannerImage {
              altText
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 50, grayscale: true) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  console.log(bannerImage);

  return (
    <Layout>
      <SEO title="Home" />
      <Wrapper>
        <div className="banner">
          <Image
            fluid={bannerImage.imageFile.childImageSharp.fluid}
            alt={bannerImage.altText}
          />
          <div className="inner-div">
            <p className="header-title">{title}</p>
          </div>
          <BottomEdgeDown color={COLORS.BLACK} />
        </div>
        <div className="description">
          <p>{description}</p>
          <BottomEdgeUp color={COLORS.PRIMARY} />
        </div>
        <div className="games">
          <h2>Featured Games</h2>
          <div className="game-items">
            {featuredGames.map(({ gameMeta, slug }) => (
                <Game key={slug} to={`/${slug}`}>
                  <Image
                    fluid={gameMeta.image.imageFile.childImageSharp.fluid}
                    alt={gameMeta.image.altText}
                  />
                  <div className="game-info">
                    <p>{gameMeta.name}</p>
                    <p>{gameMeta.publisher}</p>
                  </div>
                </Game>
              ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
}

export default IndexPage
