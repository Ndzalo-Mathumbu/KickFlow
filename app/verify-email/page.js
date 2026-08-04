import VerifyEmail from "../_components/VerifyEmail";

const Page = async function ({ searchParams }) {
  const { token } = await searchParams;

  return <VerifyEmail token={token} />;
};

export default Page;
