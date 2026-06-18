import React from 'react';
import productsData from './products.json';

// Utility functions
function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}

function getImageUrl(assetPath) {
  return new URL(assetPath, import.meta.url).href;
}

function normalizeProductDetails(productDetails) {
  return {
    ...productDetails,
    image: getImageUrl(productDetails.image),
    sizeChartLink: productDetails.sizeChartLink
      ? getImageUrl(productDetails.sizeChartLink)
      : undefined,
  };
}

// Product class (can be used as a data model)
export class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl() {
    return getImageUrl(`../images/ratings/rating-${this.rating.stars * 10}.png`);
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return "";
  }
}

export class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return `
      <a href="${this.sizeChartLink}" target="_blank" rel="noopener noreferrer">
        Size Chart
      </a>
    `;
  }
}

// Helper function to get product by ID
export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  return matchingProduct;
}

// Create products array
export const products = productsData
  .map(normalizeProductDetails)
  .map((productDetails) => {
    if (productDetails.type === 'clothing') {
      return new Clothing(productDetails);
    }
    return new Product(productDetails);
  });

// React Component Example (if you want to render products)
export const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <div className="rating">
        <img src={product.getStarsUrl()} alt={`${product.rating.stars} stars`} />
        <span>({product.rating.count})</span>
      </div>
      <p className="price">{product.getPrice()}</p>
      {product.extraInfoHTML && (
        <div dangerouslySetInnerHTML={{ __html: product.extraInfoHTML() }} />
      )}
    </div>
  );
};

// Product List Component
export const ProductList = () => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};