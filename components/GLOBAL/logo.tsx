import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
      <span className="text-primary">Manga</span>
      <span className="text-muted-foreground">Chan</span>
    </Link>
  );
};

export default Logo;
