import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/Layout"
import SEO from "../components/seo/Seo"
import { Wrapper, Image } from "./templateStyles/gameStyles"

const gameTemplate = ({
  data: {
    wpcontent: {
      game: {
        gameMeta,
        platforms: { edges: platforms },
      },
    },
  },
}) => {

  return (
    <Layout>
      <SEO title="Game" />
      <Wrapper>
        <div className="game-container">
          <div className="game-image">
            <Image
              fluid={gameMeta.image.imageFile.childImageSharp.fluid}
              alt={gameMeta.image.altText}
            />
            <div className="platforms">
              {platforms.map(({ node: platform }) => (
                <div key={platform.name} className="platform">
                  {platform.name}
                </div>
              ))}
            </div>
          </div>
          <div className="game-info">
            <h2>
              {gameMeta.name}
            </h2>
            <p className="description">{gameMeta.description}</p>
            <p className="releaseYear">{gameMeta.releaseYear}</p>
            <p className="publisher">{gameMeta.publisher}</p>
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default gameTemplate

export const pageQuery = graphql`
  query($id: ID!) {
    wpcontent {
      game(id: $id, idType: ID) {
        platforms {
          edges {
            node {
              name
            }
          }
        }
        gameMeta {
          description
          fieldGroupName
          name
          publisher
          releaseYear
          image {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 75) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              altText
            }
        }
        id
      }
    }
  }
`
