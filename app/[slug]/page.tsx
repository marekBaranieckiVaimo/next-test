import ProductDisplay from '../../components/ProductDisplay';
import { getProductById } from '../../sdk/product';
export default async function Page({ params }: { params: { slug: string } }) {
  const product = await getProductById(params.slug);
  console.log('Product page render');
  return (
    <main className="flex min-h-screen items-center justify-between p-24">
     <ProductDisplay productProp={product.body} timestampProp={new Date(Date.now()).toISOString()}/>
    </main>
  )
}
