import {LoginComp} from '@/components/auth/login';

export interface ILogInProps {
}

export default function LogIn (props: ILogInProps) {
  return (
      <div>
        <LoginComp />
      </div>
  );
}