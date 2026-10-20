import type { Sign } from "@/types/sign";

export default function SignIllustration({ sign }: { sign: Sign }) {
  if (sign.illustrationPath) {
    return (
      <img
        className="sign-illustration"
        src={sign.illustrationPath}
        alt={`${sign.word} sign illustration`}
      />
    );
  }

  return (
    <div className="illustration-placeholder" role="img" aria-label={`No verified illustration available for ${sign.word}`}>
      <span aria-hidden="true">Illustration pending</span>
      <small>Not a BSL sign depiction</small>
    </div>
  );
}
