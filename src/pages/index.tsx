import type { NextPage } from "next";
import { useState } from "react";
import { toast } from "react-toastify";
import { trpc } from "~/utils/trpc";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="2xl:max-w-[90rem] max-w-[68rem] mx-auto">
      <div className="m-8 grid grid-cols-[repeat(auto-fill,_320px)] gap-7">
        <h2>Login / Home page</h2>
      </div>
    </div>
  );
};

export default Home;
