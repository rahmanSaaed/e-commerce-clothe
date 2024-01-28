import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ReturnsEn {
	constructor() { }

	translateReturn(variable: any) {
		if (sessionStorage.getItem('lang') == 'ar') {
			// console.log('translateReturn', variable + 'Ar');
			return variable + 'Ar';
		} else {
			// console.log(variable)
			return variable;
		}
	}

	public CATEGORIES = `{
    categoryId
    ${this.translateReturn('name')}
    image
    subCategories {
      subcategoryId
      ${this.translateReturn('name')}
    }
  }
  `;

	public TOKEN = `{
    accessToken
  }`;

	public ROOM_CATEGORIES = `{
    roomCategoryId
    ${this.translateReturn('name')}
  }
  `;

	public ROOM_CATEGORY = `{
    roomCategoryId
    ${this.translateReturn('name')}
    ${this.translateReturn('description')}
    room {
		roomId
		image
		elements {
			variantId
			x
			y
		}
		roomVariants{
      x
      y
			variant{
				frontImage
        ${this.translateReturn('name')}
				price
				salePrice
				variantId
			}
		}
    }
    categories {
      categoryId
	  image
      ${this.translateReturn('name')}
    }
    crossSellingCategories{
      categoryId
      ${this.translateReturn('name')}
	  image
    }

  }
  `;

	public CITIES = `{
  cityId
  zoneId
  ${this.translateReturn('name')}
  areas {
    areaId
    ${this.translateReturn('name')}
  }
  }
  `;

	public BUYER_ID = `{
    buyerId
  }
  `;

	public MESSAGE = `{
    message
  }
  `;

	public BLOGS = `{
    blogId
    dateCreated
    ${this.translateReturn('name')}
    image
    blogTag {
      tagId
      ${this.translateReturn('name')}
    }
  }`;

	public BLOG = `{
    ${this.translateReturn('name')}
    image
    ${this.translateReturn('description')}
    blogTag {
      tagId
    }
  }`;

	public IS_SUBSCRIPED = `{
    isSubscribed
  }`;

	public ABOUT = `{
    ${this.translateReturn('mission')}
    ${this.translateReturn('section2Description')}
    ${this.translateReturn('section1Description')}
    ${this.translateReturn('section1Title')}
    ${this.translateReturn('section2Title')}
    ${this.translateReturn('vision')}
    images
  }`;

	public SETTING = `{
    email
    phone
    facebook
    instagram
    twitter
    ${this.translateReturn('address')}
  }`;

 public SLOGANS = `{
  ${this.translateReturn('contactUsTitle')}
  ${this.translateReturn('contactUsDescription')}
  ${this.translateReturn('footer')}
  ${this.translateReturn('header')}
  ${this.translateReturn('subscriptionTitle')}
  ${this.translateReturn('blogTitle')}
}`;

  public HOME_SETTING = `{
	homePageSectionOneImage
	${this.translateReturn('homePageSectionOneTitle')}
	${this.translateReturn('homePageSectionOneDescription')}
  homePageSectionTowImage
  ${this.translateReturn('homePageSectionTowTitle')}
	${this.translateReturn('homePageSectionTowDescription')}
  }`;

	public SITTINGS_POLICY = `{
    ${this.translateReturn('returnPolicy')}
    ${this.translateReturn('privacyPolicy')}
  }`;

	public TERMS_CONDITIONS = `{
    termsConditionsId
    ${this.translateReturn('title')}
    ${this.translateReturn('description')}
  }`;

	public BUYER = `{
      buyerId
      email
      buyerFirstName
      buyerLastName
      phoneNumber
      avatar
  }`;

	public RELATED = `{
    productId
    price
    salePrice
    sale
    ${this.translateReturn('name')}

    images
    reviews {
      rate
    }
  }`;

	public PRODUCT_DETAIL = `{
    ${this.translateReturn('name')}
    variantId
    subcategoryId
    categoryId
    productId
    price
    qty
    onSale
    salePrice
    attributes {
      attributeId
      valueId
    }
    images
    featuredImage
    frontImage
    ${this.translateReturn('description')}
    ${this.translateReturn('careInstruction')}
    construction {
      ${this.translateReturn('key')}
      ${this.translateReturn('value')}
    }
    productAttributesValues {
      attributeId
      attributeType
      ${this.translateReturn('name')}
      values {
        attributeValueId
        ${this.translateReturn('name')}
      }
    }
    reviews {
      rate
      description
      buyer {
        buyerFirstName
        buyerLastName
      }
    }
  }`;

	// public PRODUCT_DETAIL = `{
	//   ${this.translateReturn('name')}
	//   productId
	//   ${this.translateReturn('description')}
	//   images
	//   categoryId
	//   subCategoryId
	//   qty
	//   price
	//   salePrice
	//   sale
	//   specs {
	//     specId
	//     ${this.translateReturn('specName')}
	//     ${this.translateReturn('valueName')}
	//   }
	//   crossSelling {
	//     productId
	//     price
	//     salePrice
	//     sale
	//     ${this.translateReturn('name')}
	//     qty
	//     images
	//     reviews {
	//       rate
	//     }
	//   }
	//   brand {
	//     image
	//     ${this.translateReturn('name')}
	//     brandId
	//   }
	//   reviews {
	//     description
	//     reviewId
	//     rate
	//     buyer {
	//       avatar
	//     }
	//     product {
	//       description
	//       productId
	//     }
	//   }
	// }`;

	public RELATES_PRODUCT = `{
    productId
    price
    ${this.translateReturn('name')}
    qty
    images
  }`;

	public PRODUCT_REVIEWS = `{
    rate
    description
    buyer {
      buyerFirstName
      avatar
    }
  }`;

	public FILTER = `{
    productId
    price
    ${this.translateReturn('name')}
    qty
    images
    salePrice
    sale
    reviews {
      rate
    }
  }`;

	// public PRODUCT = `{
	//   productId
	//   ${this.translateReturn('name')}
	//   images
	//   qty
	//   subCategoryId
	//   categoryId
	//   ageId
	//   genderId
	//   brandId
	//   price
	//   salePrice
	//   sale
	//   reviews {
	//     rate
	//   }
	// }`;

	//  reviews {
	//     rate
	//   }

	public PRODUCT_LIST = `{
    variantId
    ${this.translateReturn('name')}
    frontImage
    price
    salePrice
    onSale
    reviews {
      rate
    }
    colorsCollection {
      color
      variant {
        variantId
        salePrice
        price
        frontImage
        ${this.translateReturn('name')}
        reviews {
          rate
        }
      }
    }
  }`;

	public SEARCH = `{
    productId
    ${this.translateReturn('name')}
    ${this.translateReturn('highlightedName')}
  }`;

	public CATEGORY_NAME = `{
    categoryId
    ${this.translateReturn('name')}
    attributes {
      attributeId
      ${this.translateReturn('name')}
      attributeValues {
        attributeValueId
        ${this.translateReturn('name')}
      }
      attributeType
    }
  }`;

	public SUB_CATEGORY_NAME = `{
    subcategoryId
    categoryId
    ${this.translateReturn('name')}
  }`;

	public CART_ID = `{
    cartId
  }`;

	public ADD_TO_CART = `{
  cartId
  cartDetails {
    cartDetailId
    variantId
    price
    qty
    variant {
      ${this.translateReturn('name')}
      variantId
      subcategoryId
      categoryId
      productId
      price
      qty
      onSale
      salePrice
      featuredImage
      frontImage
      crossSelling
  }
}
}`;

	public FAVORITES = `{
  favouriteId
  variantId
  buyerId
  variant  {
    variantId
    ${this.translateReturn('name')}
    frontImage
    price
    salePrice
    colorsCollection {
      color
      variant {
        variantId
        salePrice
        price
        frontImage
        ${this.translateReturn('name')}
        reviews {
          rate
        }
      }
    }

  }
  }`;

	public SLIDER = `{
    sliderId
    image
    ${this.translateReturn('title')}
    ${this.translateReturn('description')}
  }`;

	public POPULAR_CATEGORY = `{
    categoryId
    ${this.translateReturn('name')}
    image
  }`;

	public POPULAR_SUB_CATEGORY = `{
    subcategoryId
    ${this.translateReturn('name')}
    image
  }`;

	public NEW_ARRIVALS = `{
    productId
    ${this.translateReturn('name')}
    price
    salePrice
    images
    reviews {
      rate
    }
  }`;

	public PRODUCT_WE_LOVE = `{
    variantId
    price
    salePrice
    ${this.translateReturn('name')}
    qty
    frontImage
    salePrice
    reviews {
      rate
    }
    colorsCollection {
      color
      variant {
        variantId
        salePrice
        price
        frontImage
        ${this.translateReturn('name')}
        reviews {
          rate
        }
      }
    }
  }`;

	public PRODUCT_TRENDING = `{
    productId
    price
    ${this.translateReturn('name')}
    qty
    images
    reviews {
      rate
    }
  }`;

	public ADRESS = `{
    addressId
    zoneId
    userId
    address
    type {
    name
    nameAr
    }
    deliveryNote
    city {
      ${this.translateReturn('name')}
      cityId
    }
    areaId
    area {
      areaId
      ${this.translateReturn('name')}
    }
    }`;

	public CART_PRODUCTS = `{
      cartId
      cartDetails {
        cartDetailId
        productId
        product {
          salePrice
          sale

          variantId
          price
          ${this.translateReturn('name')}
          qty
          images
        }
        price
        qty
      }
      }`;


	public GET_CART = `{
          cartId
          cartDetails {
            cartDetailId
            variantId
            price
            qty
            variant {
              ${this.translateReturn('name')}
              variantId
              subcategoryId
              categoryId
              productId
              price
              qty
              onSale
              salePrice
              crossSelling
              attributes {
                attributeId
                valueId
              }
              frontImage
              ${this.translateReturn('description')}
              ${this.translateReturn('careInstruction')}

          }
        }
    }`;

	// public GET_CART = `{
	//   cartId
	//   cartDetails {
	//     cartDetailId
	//     productId
	//     price
	//     qty
	//     product {
	//       pickUpLocationId
	//       productId
	//       price
	//       ${this.translateReturn('name')}
	//       qty
	//       images
	//       freeShipping
	//       tax
	//       salePrice
	//       sale
	//       weightInKilo
	//       crossSelling {
	//         productId
	//         price
	//         ${this.translateReturn('name')}
	//         qty
	//         images
	//         salePrice
	//         sale
	//         reviews {
	//           rate
	//         }
	//       }
	//     }
	//   }
	//   }`;

	public ORDERS = `{
    orderId
    orderCode
    totalPrice
    dateCreated
    transactionStatus
    orderDetails {
      orderDetailId
      product {
        ${this.translateReturn('name')}
      }
    }
  }`;

	public CURENCIES = `{
    currencyId
    ${this.translateReturn('name')}
    isoAlpha_3
    icon
    EGP_rate
  }`;

	public ORDER_DETAIL = `{
    orderId
    orderCode
    totalPrice
    dateCreated
    shippingFees
    subTotalPrice
    deliveryAt
    dateDelivered

    email
    mobile
    address {
      city
      area
      address
      type
    }
    meta{
      promoCode
      promoDiscount
    }
    orderDetails {
      qty
      price
      subTotal
      totalPrice
      orderDetailId
      variant {
        variantId
        productId
        price
        ${this.translateReturn('name')}
        qty
        frontImage
        salePrice
      }
    }
  }`;

	public TRACK_ORDER = `{
    orderCode
    totalPrice
    dateCreated
    transactionStatus
    subTotalPrice
    tax
    shippingFees
    orderDetails {
      product {
        images
      }
    }
  }`;

	public ORDER_STATUS = `{
    orderStatusId
    ${this.translateReturn('name')}
    code
    ${this.translateReturn('description')}
  }
  `;

	public SHIPPING_FEES = `{
    shippingFees
      }`;

	public BUYER_REVIEWS = `{
    description
          reviewId
      rate
      variant {
        ${this.translateReturn('name')}
        frontImage
        variantId
      }
    }
    `;

	public REVIEW_ID = `{
  reviewId
}`;

	public SUBSCRIPTION = `{
      subscriptionId
      email
        }`;

	public UPDATE_CART = `{
      cartDetailId
      qty
      variantId
      price
      variant {
        variantId
        price
        ${this.translateReturn('name')}
        qty
        images
      }
      }`;

	public PROMO_CODE = `{
        promoCodeId
        name
        nameAr
        code
        expiresAt:
        limit
        uses
        value
        type
        createdAt
        }`;

        public CROSS_SELLING = `{
            variantId
            ${this.translateReturn('name')}
            frontImage
            price
            salePrice
          }`;

  public ORDER = `{
      orderId
      orderCode
      subTotalPrice
      totalPrice
      dateCreated
      transactionStatus
    }
    `;

	public ADDRESS_TYPE = `{
      name
      nameAr
    }
    `;

	public GENDER = `{
      genderId,
      ${this.translateReturn('name')}
}`;

	public TTRIBUTES = `{
    attributeId
    ${this.translateReturn('name')}
    attributeValues {
      attributeValueId
      ${this.translateReturn('name')}
    }
    attributeType
}`;
}
