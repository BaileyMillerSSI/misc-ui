import { type NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => (
  <div>
    <ul>
      <li>
        <Link href="ui/login">Login Screen</Link>
      </li>
      <li>
        <Link href="ui/signup">Signup Screen</Link>
      </li>
    </ul>
  </div>
);

export default Home;
