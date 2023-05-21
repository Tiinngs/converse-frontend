import Image from "next/image";

function ProductImage({ product, fill }) {
    return (
        <>
            {fill ? (
                <Image
                    src={product.img}
                    alt={product.title}
                    fill
                    className={`object-contain group-hover:opacity-75`}
                />
            ) : (
                <Image
                    src={product.img}
                    alt={product.title}
                    width={400}
                    height={1000}
                    className={`object-contain group-hover:opacity-75`}
                />
            )}
        </>
    );
}

export default ProductImage;
