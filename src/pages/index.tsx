import type { NextPage } from "next";
import LoginForm from "~/components/login/form";

const Home: NextPage = () => {

  return (
    <div className="2xl:max-w-[90rem] max-w-[68rem] mx-auto">
      <div className="m-12 grid grid-cols-3 gap-1">
        <div></div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Home;
