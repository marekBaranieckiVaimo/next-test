'use client'
import { ClientResponse, Product } from '@commercetools/platform-sdk';
import { useState } from 'react';

type ResponseType = Product & {timestamp: string};

export default function ProductDisplay({productProp, timestampProp} : {productProp: Product, timestampProp: string}) {
  const [result, setResult] = useState<ResponseType | null>(null);

  const refreshProduct = async () => {
    const refreshed = await (await fetch(`api/product/${productProp.id}`)).json()
    setResult(refreshed);
  };

  const buttonStyles = {
    fontSize: "36px"
  }

  const productName = result ? result.masterData.current.name : productProp;
  const timestamp = result ? result.timestamp : timestampProp;

  return (
       <div className="z-10 w-full max-w-5xl flex-col items-center justify-center font-mono text-sm lg:flex">
        <button className="mb-3 p-5 border-2 border-white" style={buttonStyles} onClick={refreshProduct}>REFRESH</button>
        <div className="w-full">{JSON.stringify(productName)}</div>
        <div className="w-full">{timestamp}</div>
        </div>
  )
}
