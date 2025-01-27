import { FC } from "react";
import { Badge, Button } from "react-bootstrap";

interface Props {
  text?: string;
  handleRemove?: () => void;
  truncate?: boolean;
}

const MultiSelectBadge: FC<Props> = ({
  text,
  handleRemove,
  truncate = false,
}) => {
  const X_BTN_STYLE = {
    width: "1.1rem",
    height: "1.1rem"
  };

  return (
    <Badge
      pill
      bg="light"
      className={`${
        truncate ? "text-truncate" : ""
      } me-1 d-flex gap-1 align-items-center text-dark`}
    >
      <span className={truncate ? "text-truncate" : undefined}>{text}</span>
      {handleRemove && (
        <Button
          variant="link"
          size="sm"
          className="flex-shrink-0 p-0 ms-1 text-dark rounded-circle border border-dark bg-transparent d-flex align-items-center justify-content-center text-decoration-none"
          style={X_BTN_STYLE}
          onClick={(e) => {
            e.stopPropagation();
            handleRemove();
          }}
        >
          &times;
        </Button>
      )}
    </Badge>
  );
};

export default MultiSelectBadge;
