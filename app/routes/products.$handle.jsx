import {useLoaderData} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';

export function loader({params}) {
  const {handle} = params;

  return json({
    handle
  });
}

export default function ProductHandle() {
  const {handle} = useLoaderData();

  return (
    <div className="product-wrapper">
      <h2>Product Handle: {handle}</h2>
    </div>
  );
}
