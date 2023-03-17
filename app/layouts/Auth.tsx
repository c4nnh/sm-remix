import type { PropsWithChildren } from "react";
import { LogoIcon } from "~/components";

type Props = PropsWithChildren & {
  header?: React.ReactNode;
};

export const AuthLayout: React.FC<Props> = ({ header, children }) => {
  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-center sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto h-12 text-heading">
          <LogoIcon viewBox="0 0 30 25" />
        </div>
        {header}
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 sm:px-10">{children}</div>
      </div>
    </div>
  );
};
