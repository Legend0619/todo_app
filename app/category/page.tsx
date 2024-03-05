import Head from "next/head";
import Category from "@/pages/Category";

const Page = () => {
	return (
		<div>
			<Head>
				<title>Category</title>
				<meta
					name="description"
					content="Awesome todoapp to store your awesome todos"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Category />
			</main>
		</div>
	);
}

export default Page;
