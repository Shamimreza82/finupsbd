import Image from "next/image";
import Link from "next/link";
import not_found_image from "/public/under-construction.jpg";

const UnderConstructionPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <Image
        src={not_found_image}
        alt="404 Not Found"
        className="mx-auto w-1/2"
      />
      <h1 className="mb-10 mt-10 text-xl font-bold text-primary xl:text-6xl">
        Page Under Construction
      </h1>
      <Link
        href="/"
        className="inline-block rounded bg-primary px-6 py-2 text-white transition hover:bg-green-700"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default UnderConstructionPage;
