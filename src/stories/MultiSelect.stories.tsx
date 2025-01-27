import { CSSProperties, useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import MultiSelect from "@/components/multiselect/MultiSelect";

interface Option {
  label: string;
  value: string;
}

export default {
  title: "MultiSelect",
  component: MultiSelect,
} as Meta;

const Template: StoryFn<{
  value: Option[];
  options: Option[];
  template: (value: Option) => string;
  style: CSSProperties;
}> = (args) => {
  const [value, setValue] = useState<Option[]>(args.value);

  return <MultiSelect {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  value: [],
  options: [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
    { label: "Very very very very very very very long option 5", value: "6" },
  ],
  template: (option: Option) => option.label,
  style: {
  },
};
