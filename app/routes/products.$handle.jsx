import {useLoaderData} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';

export async function loader({params, context}) {
  const {handle} = params;
  const {product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
    },
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  return json({
    handle,
    product,
  });
};
// このコード例では、ローダー関数に渡されるURL ハンドル変数を paramsから取得し、
// JSX コンポーネントで使用できるサンプル JSON を返す

export default function ProductHandle() {
  const {handle, product} = useLoaderData();

  return (
    <div className="product-wrapper">
      <h2>Product Handle: {handle}</h2>
      <PrintJson data={product} />
    </div>
  );
}

function PrintJson({data}) {
  return (
    <details className="outline outline-2 outline-blue-300 p-4 my-2">
      <summary>Product JSON</summary>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </details>
  );
}

const PRODUCT_QUERY = `#graphql
  query product($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      vendor
    }
  }
`;
