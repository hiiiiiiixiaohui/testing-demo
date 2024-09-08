import React from "react";

import { EditContainerProps } from "@/@types/index";


const EditContainer: React.FC<EditContainerProps> = ({
  isEdit,
  EditComponent,
  NormalDisplayComponent,
}) => {
  return <>{isEdit ? EditComponent : NormalDisplayComponent}</>;
};

export default EditContainer;
