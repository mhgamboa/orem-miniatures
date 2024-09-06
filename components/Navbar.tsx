import Link from "next/link";

import Container from "@/components/ui/Container";
import MainNav from "@/components/MainNav";

export default function Navbar() {
  return (
    <div>
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml:0 gap-x-2">
            <p className="font-bold text-xl">STORE</p>
          </Link>
          <MainNav data={[]} />
        </div>
      </Container>
    </div>
  );
}
