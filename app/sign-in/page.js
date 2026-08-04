import SignInForm from "../_components/SignIn";

const Page = async function ({ searchParams }) {
  const { verified } = await searchParams;

  return <SignInForm verified={verified} />;
};

export default Page;
