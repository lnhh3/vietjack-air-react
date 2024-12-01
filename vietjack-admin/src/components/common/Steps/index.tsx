import React, { Fragment, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import { StepBaseIcon, StepCompleteIcon, StepCurrentIcon } from '@/assets/svgs';

import styles from './style.module.scss';

export type Step = {
  label: string | React.ReactNode;
  component?: ReactNode;
  status: 'active' | 'done' | 'pending';
  hidden?: boolean;
  stepIcon?: React.ReactNode;
};

type Props = {
  currentStep: number;
  steps: Step[];
  stepIndex?: number;
  onChangeStep?: (step: number) => void;
  stepClassName?: string;
  lineClassName?: string;
};

export default function Steps({
  steps,
  currentStep,
  onChangeStep = () => {},
  stepClassName,
  lineClassName,
}: Props) {
  const handleStepIcon = (index: number) => {
    if (currentStep < index) {
      return (
        <div className="flex items-center justify-center w-8 h-8">
          <StepBaseIcon />
        </div>
      );
    } else if (currentStep === index) {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-50">
          <StepCurrentIcon />
        </div>
      );
    } else if (currentStep > index) {
      return (
        <div className="flex items-center justify-center w-8 h-8">
          <StepCompleteIcon />
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col">
      {steps.map((step, index) => {
        return step.hidden ? (
          <Fragment key={index}></Fragment>
        ) : (
          <div key={index}>
            {(step.hidden || (index !== 0 && index <= steps.length)) && (
              <div className={twMerge('w-8', lineClassName)}>
                <div className="mx-auto h-4 w-[2px] rounded-lg bg-gray-200" />
              </div>
            )}

            <div
              role="presentation"
              className={twMerge(
                'flex cursor-pointer items-center gap-4',
                index === currentStep && styles.active,
                stepClassName
              )}
              onClick={() => {
                onChangeStep(index);
              }}
            >
              <div>
                <div
                  className={twMerge(
                    'relative shrink-0 rounded-full',
                    index === currentStep && styles.completed
                  )}
                >
                  {step.stepIcon ? (
                    <div className="rounded-full border-[2px] border-gray-200 bg-white p-[6px] text-gray-400">
                      {step.stepIcon}
                    </div>
                  ) : (
                    handleStepIcon(index)
                  )}
                </div>
              </div>

              <div className={twMerge(styles.label, '!text-sm-semi-bold text-gray-700')}>
                {step.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
