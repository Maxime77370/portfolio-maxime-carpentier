// DynamicModal.tsx
'use client';

import dynamic from 'next/dynamic';
import LoaderModal from './modal-loader';
import { ModalWrapperProps } from './modal-wraper';

const DynamicModal = dynamic<ModalWrapperProps>(
  () => import('./modal-wraper').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <LoaderModal />,
  }
);

export default DynamicModal;
