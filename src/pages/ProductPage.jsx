import React from "react";
import { useParams } from "react-router-dom";

import '../styles/ProductPage.css';

import { IconContext } from "react-icons";
import { FiCheck, FiFile, FiMusic, FiPlusCircle } from "react-icons/fi";

import { storeClient } from '../storeClient';
import gql from 'graphql-tag';

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        name: "",
        description: "",
        assets: [],
        featuredAsset: { source: "" },
        variants: [{priceWithTax: 0}]
      }
    };
  }

  componentDidMount() {
    const product = this.props.params.product;

    storeClient.query({
      query: gql`
        query RevealProduct {
          product(slug: "${product}") {
            name
            description
            assets {
              id
              name
              source
              mimeType
            }
            variants {
              priceWithTax
            }
            featuredAsset {
              source
            }
          }
        }
      `,
    }).then(result =>{
      this.setState({product: result.data.product});
      console.log(result.data.product.variants[0].price);
    });
  }

  render() {
    return (
      <main className="">
        <div className="flex flex-col items-center mb-8">
          <div className="all-width pt-24 gap-8 flex justify-between">
            <div className="content-width shrink-0">
              <h1 className="text-4xl my-6">{this.state.product.name}</h1>
              <div
                dangerouslySetInnerHTML={{__html: this.state.product.description}}
                className="pb-4 text-md space-y-4 opacity-75"
              />
              <div className="btn btn-primary btn-lg shadow-2xl shadow-primary mb-8">
                <IconContext.Provider value={{ size: "1.5em" }}>
                  <span className="mr-2 text-lg">Buy for {
                    this.state.product.variants[0].priceWithTax / 100
                  } $</span>
                  <FiPlusCircle/>
                </IconContext.Provider>
              </div>
              <p className="opacity-75 text-sm">
                Price includes VAT. Upon purchase, you'll receive an e-mail with your download link.
              </p>
            </div>
            <div className="relative" style={{width:"32rem"}}>
              {<img src={this.state.product.featuredAsset.source} className="w-full rounded-2xl saturate-150 brightness-150 opacity-60 blur-3xl absolute"/>}
              {<img src={this.state.product.featuredAsset.source} className="w-full rounded-2xl relative"/>}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mb-8 space-y-4">
          <div className="all-width">
            <h2 className="text-4xl mb-4 mt-8 text-center">What's inside?</h2>
          </div>
          <iframe className="all-width aspect-video rounded-xl" src="https://www.youtube-nocookie.com/embed/EQpZJa6cifQ?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <IconContext.Provider value={{ size: "2em" }}>
              <div className="stats shadow bg-base-200 border-base-300 border">
                <div className="stat">
                  <div className="stat-figure text-primary">
                    <FiMusic/>
                  </div>
                  <div className="stat-title">Total Samples:</div>
                  <div className="stat-value">89,400</div>
                  <div className="stat-desc">High Quality Samples</div>
                </div>
                <div className="stat">
                  <div className="stat-figure text-primary">
                    <FiFile/>
                  </div>
                  <div className="stat-title">File Size:</div>
                  <div className="stat-value">930 MB</div>
                  <div className="stat-desc">Lossless Files</div>
                </div>
                <div className="stat">
                  <div className="stat-figure text-primary">
                    <FiCheck/>
                  </div>
                  <div className="stat-title">Everything:</div>
                  <div className="stat-value">100%</div>
                  <div className="stat-desc">Royalty Free</div>
                </div>
              </div>
            </IconContext.Provider>
            <div className="all-width flex gap-4">
              <div className="card bg-base-200 grow border-base-300 border">
                <div className="card-body">
                  {
                    this.state.product.assets.some((a)=>{
                      return a.mimeType.split("/")[0] == "audio"
                    }) && <h2 className="text-2xl">Previews</h2>
                  }
                  {
                    this.state.product.assets.map(a => (
                      a.mimeType.split("/")[0] == "audio" ?
                        (
                          <div className="mt-4" key={a.id}>
                            <div className="opacity-75 mb-2">{a.name}</div>
                            <audio className="w-full" controls><source src={a.source} type={a.mimeType}/></audio>
                          </div>
                        )
                      : null
                    ))
                  }
                </div>
              </div>
              <div className="card bg-base-200 border-base-300 border">
                <div className="card-body">
                  <h2 className="text-2xl">Content</h2>
                  <div>
                    <h3>Drums</h3>
                    <div className="opacity-75 mb-4">
                      <ul>
                        <li>240 Kicks</li>
                        <li>160 Snares</li>
                        <li>90 Crashes</li>
                        <li>120 Closed Hats</li>
                        <li>120 Open Hats</li>
                      </ul>
                    </div>
                    <h3>Drum Loops</h3>
                    <div className="opacity-75 mb-4">
                      <ul>
                        <li>130 Complete Loops</li>
                        <li>80 Top Loops</li>
                        <li>100 Hat Loops</li>
                      </ul>
                    </div>
                    <h3>Synth Loops</h3>
                    <div className="opacity-75 mb-4">
                      <ul>
                        <li>40 Chord Loops</li>
                        <li>110 Melody Loops</li>
                        <li>80 Top Loops</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </main>
        );
    }
}

export default withParams(ProductPage);