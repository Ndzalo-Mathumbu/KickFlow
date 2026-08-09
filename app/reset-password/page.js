import AlertDestructive from "../_components/AlertDestructive";
import ResetPassword from "../_components/ResetPassword";
import ResetPasswordEmail from "../_components/ResetPasswordEmail";

const Page = async function ({ searchParams }) {
  const { token } = await searchParams;
  return (
    <>
      <ResetPassword token={token} />
      <ResetPasswordEmail token={token} />
    </>
  );
};
export default Page;
