import React from "react";
import {useParams} from "react-router-dom";

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
        description: ""
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
          }
        }
      `,
    }).then(result =>{
      this.setState({product: result.data.product});
    });
  }

  render() {
    return (
      <main className="flex flex-col items-center">
        <div className="all-width pt-24">
          <h1 className="text-4xl my-6">{this.state.product.name}</h1>
          <div
            dangerouslySetInnerHTML={{__html: this.state.product.description}}
            className="pb-4 text-md"
          />
        </div>
      </main>
        );
    }
}

export default withParams(ProductPage);