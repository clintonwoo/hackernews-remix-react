import { BlankLayout } from '../../layouts/blank-layout';

function ForgotPage(): JSX.Element {
  return (
    <BlankLayout>
      <b>Reset your password</b>
      <br />
      <br />
      <form method="post" action="/x">
        <input type="hidden" name="fnid" value="SW3mxENlH7rdjgxwWaobR5" />
        <input type="hidden" name="fnop" value="forgot-password" />
        username: <input type="text" name="s" size={20} />
        <br />
        <br />
        <input type="submit" value="Send reset email" />
      </form>
    </BlankLayout>
  );
}

export default ForgotPage;
