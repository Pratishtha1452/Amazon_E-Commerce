import { Product, clothing, Appliance } from "../../data/products.js";

describe('test suite: Product', () => {
  let product;
  beforeEach(() => {
    product = new Product({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090
    });
  }); 

  it('it has correct properties', () => {
    expect(product.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(product.name).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(product.image).toEqual('images/products/athletic-cotton-socks-6-pairs.jpg');
  });
  it('it gets correct star value', () => {
    expect(product.getStarsUrl()).toEqual('images/ratings/rating-45.png');
  });
  it('it gets correct price', () => {
    expect(product.getPrice()).toEqual('$10.90');
  });
  it('it does not display extraInfo', () => {
    expect(product.extraInfoHtml()).toEqual('');
  });
});

describe('test suite: clothing', () => {
  let cloth;
  beforeEach(() => {
    cloth = new clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56
      },
      priceCents: 799,
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png"
    });
  });
  it('it has correct properties', () => {
    expect(cloth.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
    expect(cloth.name).toEqual("Adults Plain Cotton T-Shirt - 2 Pack");
    expect(cloth.sizeChartLink).toEqual("images/clothing-size-chart.png");
  });
  it('it gets correct star value', () => {
    expect(cloth.getStarsUrl()).toEqual('images/ratings/rating-45.png');
  });
  it('it gets correct price', () => {
    expect(cloth.getPrice()).toEqual('$7.99');
  });
  it('displays extraInfo', () => {
    expect(cloth.extraInfoHtml()).toContain('Size Chart');
    expect(cloth.extraInfoHtml()).toContain('images/clothing-size-chart.png');
  });
});


describe('test suite: Appliance', () => {
  let inst;
  beforeEach(() => {
    inst = new Appliance({
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197
      },
      priceCents: 1899,
      type: "instructions",
      instructionsLink: "images/appliance-instructions.png",
      warrantyLink: "images/appliance-warranty.png"
    });
  });
  it('it has correct properties', () => {
    expect(inst.id).toEqual("54e0eccd-8f36-462b-b68a-8182611d9add");
    expect(inst.name).toEqual("2 Slot Toaster - Black");
    expect(inst.instructionsLink).toEqual("images/appliance-instructions.png");
    expect(inst.warrantyLink).toEqual('images/appliance-warranty.png');
  });
  it('it gets correct star value', () => {
    expect(inst.getStarsUrl()).toEqual('images/ratings/rating-50.png');
  });
  it('it gets correct price', () => {
    expect(inst.getPrice()).toEqual('$18.99');
  });
  it('displays extraInfo', () => {
    expect(inst.extraInfoHtml()).toContain('Instructions');
    expect(inst.extraInfoHtml()).toContain('Warranty');
  });
});