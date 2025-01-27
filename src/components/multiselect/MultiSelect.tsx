import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import MultiSelectBadge from "@/components/multiselect/MultiSelectBadge";
import "bootstrap/dist/css/bootstrap.min.css";
import MultiSelectBadgeContainer from "./MultiSelectBadgeContainer";

interface Props<T extends object> {
  value: T[];
  onChange: (value: T[]) => void;
  options: T[];
  template: (value: T) => string;
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
}

const MultiSelect = <T extends object>({
  value,
  onChange,
  options,
  template,
  placeholder = "Select items",
  className,
  style,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMoreBadge, setShowMoreBadge] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hiddenContainerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: T) => {
    const newValue = value.includes(option)
      ? value.filter((v) => v !== option)
      : [...value, option];
    onChange(newValue);
  };

  const handleRemove = useCallback(
    (option: T) => {
      const newValue = value.filter((v) => v !== option);
      onChange(newValue);
    },
    [onChange, value]
  );

  const calculateBadgesWidth = useCallback(() => {
    console.log(value.length);
    if (value.length === 1) {
      setShowMoreBadge(false);
      return;
    }

    if (containerRef.current && hiddenContainerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const badgesWidth = Array.from(
        hiddenContainerRef.current.children
      ).reduce((acc, child) => acc + (child as HTMLElement).offsetWidth, 0);
      setShowMoreBadge(badgesWidth > containerWidth);
    }
  }, [value]);

  useEffect(() => {
    calculateBadgesWidth();
  }, [calculateBadgesWidth]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      calculateBadgesWidth();
    });

    const ref = containerRef.current;
    if (ref) {
      resizeObserver.observe(ref);
    }

    return () => {
      if (ref) {
        resizeObserver.unobserve(ref);
      }
    };
  }, [calculateBadgesWidth]);

  const renderAllBadges = useCallback(
    (truncate?: boolean) => {
      return value.map((val, index) => (
        <MultiSelectBadge
          key={index}
          text={template(val)}
          handleRemove={() => handleRemove(val)}
          truncate={truncate}
        />
      ));
    },
    [handleRemove, template, value]
  );

  const renderBadges = useCallback(() => {
    if (value.length === 0) {
      return <span className="text-secondary">{placeholder}</span>;
    }

    if (showMoreBadge) {
      return <MultiSelectBadge text={`${value.length} selected`} />;
    }

    return renderAllBadges(true);
  }, [placeholder, renderAllBadges, showMoreBadge, value.length]);

  return (
    <Dropdown
      show={isOpen}
      onToggle={handleToggle}
      className={className}
      style={style}
    >
      <Dropdown.Toggle
        variant="outline-secondary"
        id="dropdown-basic"
        className="d-flex justify-content-between align-items-center text-secondary bg-transparent w-100"
      >
        <MultiSelectBadgeContainer ref={containerRef}>
          {renderBadges()}
        </MultiSelectBadgeContainer>
      </Dropdown.Toggle>

      <MultiSelectBadgeContainer hidden ref={hiddenContainerRef}>
        {renderAllBadges()}
      </MultiSelectBadgeContainer>

      <Dropdown.Menu className="w-100 z-1">
        {options.map((option, index) => (
          <Dropdown.Item
            key={index}
            as="div"
            onClick={(e) => {
              e.stopPropagation();
              handleSelect(option);
            }}
          >
            <Form.Check
              type="checkbox"
              className="text-truncate"
              label={template(option)}
              checked={value.includes(option)}
              onChange={() => handleSelect(option)}
            />
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MultiSelect;
