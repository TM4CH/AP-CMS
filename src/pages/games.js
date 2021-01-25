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

const GamesPage = () => {
  const {
    wpcontent: {
      page: {
        gamesMeta: { description, bannerImage },
      },
      games: { edges: games },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "games", idType: URI) {
          id
          gamesMeta {
            description
            bannerImage {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              altText
            }
          }
        }
        games {
          edges {
            node {
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
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Games" />
      <Wrapper gamesColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
        <div className="banner">
          <Image
            fluid={bannerImage.imageFile.childImageSharp.fluid}
            alt={bannerImage.altText}
          />
          <BottomEdgeDown color={COLORS.SECONDARY} />
        </div>
        <div className="description">
          <h2>TOP-Games</h2>
          <p>{description}</p>
          <BottomEdgeUp color={COLORS.BLACK} />
        </div>
        <div className="games">
          <h2>Our Games</h2>
          <div className="game-items">
            {games.map(({ node: { gameMeta, slug } }) => (
              <Game to={`/${slug}`} key={slug}>
                <Image
                  fluid={gameMeta.image.imageFile.childImageSharp.fluid}
                  alt={gameMeta.image.altText}
                />
                <div className="game-info">
                  <p>{gameMeta.name}</p>
                  <p>{gameMeta.releaseYear}</p>
                  <p>{gameMeta.publisher}</p>
                </div>
              </Game>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default GamesPage
