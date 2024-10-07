import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [images, setImages] = useState<[{src: string, title: string, description: string}]>()
  const [imageSearch, setImageSearch] = useState('')

  useEffect(() => {
    fetch('/images.json')
      .then((response) => response.json())
      .then((json) => setImages(json.data))
      .catch((error) => console.error('Error fetching JSON:', error));
  }, [])

  return (
    <>
      <Head>
        <title>Framework e interoperabilidad</title>
        <meta
          property="og:image"
          content="/cats/cat1.jpg"
        />
        <meta
          name="twitter:image"
          content="/cats/cat1.jpg"
        />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <div className="w-full flex items-center p-4 flex-col">
          <div className="w-1/2 flex flex-col text-center">
            <label htmlFor="imagesearch" style={{ color: 'white' }}>Buscar Imagen</label>
            <input className="rounded-lg" type="text" id="imagesearch" onChange={(e) => setImageSearch(e.target.value)} value={imageSearch} />
          </div>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          {images && images.map(({ src, title, description }) => {
            return (
              <div className="border rounded-lg p-2 border-opacity-55 border-emerald-300">
                <Image
                  alt={title}
                  className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  src={`/cats${src}`}
                  width={720}
                  height={480}
                  sizes="(max-width: 640px) 100vw,
                      (max-width: 1280px) 50vw,
                      (max-width: 1536px) 33vw,
                      25vw"
                />
                <h1>{title}</h1>
                <p>{description}</p>
              </div>
            )
          })}
        </div>
      </main>
      <footer className="p-6 text-center text-white/80 sm:p-12">
        Gracias por visitar nuestra página!
      </footer>
    </>
  );
};

export default Home;
