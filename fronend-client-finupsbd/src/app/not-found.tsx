import Image from "next/image";
import Link from "next/link";
import not_found_image from "../../public/404.jpg";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <Image
        src={not_found_image}
        alt="404 Not Found"
        className="mx-auto w-1/2"
      />
      <h1 className="mb-4 mt-10 text-4xl font-bold text-red-600">
        Page Not Found
      </h1>
      <p className="mb-6 text-lg text-gray-600">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block rounded bg-primary px-6 py-2 text-white transition hover:bg-green-700"
      >
        Go Back Home
      </Link>
    </div>
  );
}
