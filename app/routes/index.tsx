import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div>
      Self management
      <div className="flex flex-col text-blue-500 underline">
        <Link to="/users">Users</Link>
        <Link to="/currencies">Currencies</Link>
        <Link to="/tontines">Tontines</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/skills">Skills</Link>
      </div>
    </div>
  );
}
