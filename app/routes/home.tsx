import type { Route } from "./+types/home";
import Test from "../test/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "tokiolab.dev" },
    { name: "description", content: "Welcome to tokiolab!" },
  ];
}

export default function Home() {
  // return <Welcome />;
  return (
    <>
      {/* ファーストビュー */}
      <Test />

      {/* ファーストビュー */}
      <div>
        Section 1
      </div>

      {/* ファーストビュー */}
      <div>
        Section 2
      </div>
      
      {/* ファーストビュー */}
      <div>
        Section 3
      </div>
    </>
  )
}
