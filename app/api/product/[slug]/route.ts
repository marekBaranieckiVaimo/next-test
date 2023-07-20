import { NextResponse } from "next/server";
import { getProductById } from "../../../../sdk/product";

export async function GET(request: Request,
    { params }: { params: { slug: string } }) {
    console.log('product route hit');
    const product = await getProductById(params.slug);
    return NextResponse.json({...product.body, timestamp: new Date(Date.now()).toISOString() });
}