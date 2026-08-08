import ResetPassword from "../_components/ResetPassword";

const Page = async function ({ searchParams }) {
  const { token } = await searchParams;
  return <ResetPassword token={token} />;
};
export default Page;
