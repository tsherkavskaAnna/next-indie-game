import Link from "next/link";

export default function NavBar() {
    return (
        <nav>
            <ul className="flex gap-2">
                <li>
                    <Link href='/'
                    className="font-bold font-orbitron text-cyan-900"
                    >Indie Gamer</Link>
                </li>
                <li className="ml-auto">
                    <Link href='/reviews'
                    className="font-semibold font-exo2 text-cyan-900 hover:underline"
                    >Reviews</Link>
                </li>
                <li>
                    <Link href='/about'
                    className="font-semibold font-exo2 text-cyan-900 hover:underline"
                    prefetch={false}>About</Link>
                </li>
            </ul>
        </nav>
    );
}