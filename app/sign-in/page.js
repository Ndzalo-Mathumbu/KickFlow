import SignInForm from "../_components/SignIn";
import VerifyEmail from "../_components/VerifyEmail";
import VerifySendNewEmailVerificationLink from "../_components/VerifySendNewEmailVerificationLink";

const Page = async function ({ searchParams }) {
  const { token } = await searchParams;
  return (
    <>
      <SignInForm />
      {token && (
        <>
          <VerifyEmail token={token} />
          <VerifySendNewEmailVerificationLink token={token} />
        </>
      )}
    </>
  );
};

export default Page;
