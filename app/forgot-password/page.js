import ForgotPassword from "../_components/ForgotPassword";
import VerifyEmail from "../_components/VerifyEmail";

const Page = async function ({ searchParams }) {
  const { token } = await searchParams;
  return (
    <>
      <ForgotPassword />
    </>
  );
};
export default Page;
