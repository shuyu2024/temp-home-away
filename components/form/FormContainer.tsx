'use client';

// import { useFormState } from 'react-dom';
import { useActionState } from 'react';
import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { actionFunction } from '@/utils/types';
// import React from "react";

const initialState = {
  message: '',
};

function FormContainer({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) {
  // const [state, formAction] = useFormState(action, initialState);
  const [state, formAction] = useActionState(action, initialState);

  const { toast } = useToast();
  useEffect(() => {
    if (state.message) {
      toast({ description: state.message });
    }
  }, [state.message, toast]);
  return <form action={formAction}>{children}</form>;
}
export default FormContainer;