import React from "react";
import {useParams} from "react-router-dom";

import '../styles/ProductPage.css';

import { IconContext } from "react-icons";
import { FiPlusCircle } from "react-icons/fi";

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
      <main className="flex flex-col items-center mb-8">
        <div className="all-width pt-24 flex gap-16">
          <div className="content-width shrink-0">
            <h1 className="text-4xl my-6">{this.state.product.name}</h1>
            <div
              dangerouslySetInnerHTML={{__html: this.state.product.description}}
              className="pb-4 text-md space-y-4"
            />
            <div className="btn btn-primary btn-lg shadow-2xl shadow-primary mb-12">
              <IconContext.Provider value={{ size: "1.5em" }}>
                <span className="mr-2 text-lg">Buy for {
                  this.state.product.variants[0].priceWithTax / 100
                } $</span>
                <FiPlusCircle/>
              </IconContext.Provider>
            </div>
            <h2 className="text-3xl">Previews</h2>
            {
              this.state.product.assets.map(a => (
                a.mimeType.split("/")[0] == "audio" ?
                  (
                    <div className="mt-4" key={a.id}>
                      <div className="font-bold mb-0">{a.name}</div>
                      <audio className="w-full" controls><source src={a.source} type={a.mimeType}/></audio>
                    </div>
                  )
                : null
              ))
            }
          </div>
          <div className="w-full grow relative">
            {<img src={this.state.product.featuredAsset.source} className="w-full rounded-2xl saturate-150 brightness-150 opacity-60 blur-3xl absolute"/>}
            {<img src={this.state.product.featuredAsset.source} className="w-full rounded-2xl relative"/>}
            <p className="pt-6 relative">Price includes VAT. All samples are royalty free .wav files.</p>
          </div>
        </div>
      </main>
        );
    }
}

export default withParams(ProductPage);