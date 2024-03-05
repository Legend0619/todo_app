import Head from "next/head";
import Good from "@/pages/Good";

const Page = () => {
  return (
    <div>
      <Head>
        <title>Good</title>
        <meta
          name="description"
          content="Awesome todoapp to store your awesome todos"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Good />
      </main>
    </div>
  );
}

export default Page;
