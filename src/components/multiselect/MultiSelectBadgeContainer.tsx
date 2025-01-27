import { FC, ReactNode, RefObject } from "react";

interface Props {
  ref?: RefObject<HTMLDivElement | null>;
  children?: ReactNode;
  hidden?: boolean;
}

const MultiSelectBadgeContainer: FC<Props> = ({
  ref,
  children,
  hidden = false,
}) => {
  return (
    <div
      className={`d-flex flex-nowrap overflow-hidden w-100 ${
        hidden ? "invisible" : ""
      }`}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default MultiSelectBadgeContainer;
