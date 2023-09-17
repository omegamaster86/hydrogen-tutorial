import {useLoaderData} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';

export function loader({params}) {
  const {handle} = params;

  return json({
    handle
  });
}
// このコード例では、ローダー関数に渡されるURL ハンドル変数を paramsから取得し、
// JSX コンポーネントで使用できるサンプル JSON を返す

export default function ProductHandle() {
  const {handle} = useLoaderData();

  // ローダーデータをレンダリング
  return (
    <div className="product-wrapper">
      <h2>Product Handle: {handle}</h2>
    </div>
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
