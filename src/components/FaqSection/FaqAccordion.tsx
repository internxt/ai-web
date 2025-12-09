import { useState, type JSX } from 'react';
import { PlusCircle } from '@phosphor-icons/react';
import { blueText } from '../../utils/format-text';

interface FaqAccordionProps {
  question: string;
  answer: string[];
  isQuestionBigger?: boolean;
  textColor?: string;
  percentageDiscount?: string;
}

export default function FaqAccordion({
  question,
  answer,
  isQuestionBigger = false,
  textColor,
}: FaqAccordionProps): JSX.Element {
  const [active, setActive] = useState(false);

  return (
    <div className="flex flex-col items-stretch justify-start">
      <button
        type="button"
        onClick={() => setActive(!active)}
        className="my-5 flex cursor-pointer flex-row items-center justify-between space-x-6 text-left hover:text-primary"
      >
        <h3
          className={`w-full text-lg font-medium ${textColor ?? 'text-gray-100'} ${
            isQuestionBigger ? 'md:text-2xl' : 'md:text-xl'
          }`}
        >
          {question}
        </h3>
        <PlusCircle
          size={32}
          className={`${active ? 'rotate-45' : ''} duration-250 transition-transform ease-in-out`}
        />
      </button>

      <div
        className={`will-change-height flex h-auto flex-col space-y-3 overflow-hidden ${
          active ? 'max-h-[1000px] pb-8 opacity-100' : 'max-h-0 opacity-50'
        } w-full pr-14 text-left text-lg ${textColor ?? 'text-gray-60'} transition-all duration-300 ease-in-out`}
      >
        {answer.map((text, index) => (
          <p key={index} className="leading-relaxed">
            {blueText(text)}
          </p>
        ))}
      </div>
    </div>
  );
}
