// ModalWrapper.tsx
'use client';

import React from 'react';
import {
  ProjectModal,
  SchoolModal,
  JobModal,
  DiplomaModal,
} from './timeline/timeline-item-modal';
import { DictionaryItem } from './timeline/timeline-dict';

interface ModalComponentProps {
  item: DictionaryItem;
  onClose: () => void;
  fields: Array<keyof DictionaryItem>;
}
export interface ModalWrapperProps extends ModalComponentProps {
  type: string;
}

const modals: Record<string, React.FC<ModalWrapperProps>> = {
  project: ProjectModal,
  school: SchoolModal,
  job: JobModal,
  diploma: DiplomaModal,
};

const ModalWrapper: React.FC<ModalComponentProps & { type: string }> = ({
  type,
  ...props
}) => {
  const ModalComponent = modals[type] || ProjectModal;
  return <ModalComponent {...props} />;
};

export default ModalWrapper;
