import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-line">
      <div className="max-w-2xl mx-auto px-5 sm:px-6 py-5">
        <Link to="/" className="flex items-center gap-2 w-fit">
          <BookOpen className="w-5 h-5 text-wine" strokeWidth={2} aria-hidden="true" />
          <span className="font-display font-semibold text-xl">Digest</span>
        </Link>
      </div>
    </header>
  );
}
