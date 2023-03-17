import type { SVGAttributes } from "react";
import { forwardRef, useId } from "react";

export type BaseIconRef = SVGSVGElement;
export type BaseIconProps = Omit<SVGAttributes<SVGSVGElement>, "id"> & {
  title?: string;
  description?: string;
};

export const BaseIcon = forwardRef<BaseIconRef, BaseIconProps>(
  ({ title, description, children, className, ...delegated }, ref) => {
    const iconId = useId();
    const titleId = title ? `${iconId}-title` : "";
    const descriptionId = description ? `${iconId}-description` : "";

    const a11yProps = title
      ? {
          role: "img",
          "aria-labelledby": description
            ? `${titleId} ${descriptionId}`
            : titleId,
        }
      : {
          "aria-hidden": true,
        };

    return (
      <svg
        ref={ref}
        viewBox="0 0 36 30"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={`h-full w-full ${className}`}
        {...a11yProps}
        {...delegated}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        {description ? <desc id={descriptionId}>{description}</desc> : null}
        {children}
      </svg>
    );
  }
);

BaseIcon.displayName = "BaseIcon";
