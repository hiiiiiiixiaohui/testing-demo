export type ItemTypes = {
  id: number;
  name: string;
  age: number;
  email: string;
};

export type EditContainerProps = {
  isEdit: boolean;
  EditComponent: React.JSX.Element;
  NormalDisplayComponent: React.JSX.Element;
};
