import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto py-16 text-center space-y-4">
      <h1 className="font-display text-2xl font-bold">Page not found</h1>
      <p className="text-secondary text-sm">
        That route does not exist. Try home or explore.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        <Link href="/" className="btn btn-primary">
          Home
        </Link>
        <Link href="/books" className="btn btn-secondary">
          Explore
        </Link>
      </div>
    </div>
  );
}
