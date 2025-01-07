
// import React , {Component} from 'react';

// export class Product extends Component {
//   render() {
//     const router = product();
//     const { id } = router.query;
//     return (
//       <div>
//         <h1>Product Details {id}</h1>
//       </div>
//     );
//   }
// }

// export default Product

// import { useRouter } from 'next/router';

// const Post = () => {
//   const router = useRouter();
//   const { id } = router.query; // `id` will match the dynamic segment in the URL

//   return (
//     <div>
//       <h1>Post ID: {id}</h1>
//     </div>
//   );
// };

// export default Post;

import { useRouter } from 'next/router';
const ProductPage = () => {
  const router = useRouter();
  const { productid } = router.query; // Get the product ID from the URL
  return (
    <div>
      
      <p>This is product {productid}</p>
    </div>
  );
};
export default ProductPage;