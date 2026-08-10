import SendNewEmailLink from "../_components/SendNewVerificationEmailLink";
import VerifySendNewEmailVerificationLink from "../_components/VerifySendNewEmailVerificationLink";

const Page = async function ({ searchParams }) {
  const { token } = await searchParams;
  return (
    <>
      <SendNewEmailLink />
    </>
  );
};
export default Page;
