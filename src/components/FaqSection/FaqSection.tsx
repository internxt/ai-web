import { useTranslation } from 'react-i18next';
import FaqAccordion from './FaqAccordion';

interface FAQSectionProps {
  bgColor?: string;
  cardColor?: string;
  textColor?: string;
  percentageDiscount?: string;
}

const FAQSection = ({ bgColor, cardColor, textColor, percentageDiscount }: FAQSectionProps) => {
  const { t } = useTranslation();
  const faqItems = t('FaqSection.faq', { returnObjects: true }) as Array<{ question: string; answer: string[] }>;

  return (
    <section className={`overflow-hidden ${bgColor ?? 'bg-white'}`}>
      <div className="absolute left-8 right-8 top-0 h-[1px] bg-neutral-35 lg:left-32 lg:right-32"></div>
      <div className="flex flex-col items-center justify-center space-y-10 px-10 py-10 pb-16 lg:py-20">
        <p className={`text-center text-30 font-semibold ${textColor ? textColor : 'text-gray-100'} lg:text-3xl`}>
          {t('FaqSection.title')}
        </p>
        <div className="flex w-full flex-col space-y-2 lg:max-w-[850px]">
          {Array.isArray(faqItems) &&
            faqItems.map((item, index) => (
              <div className={`rounded-lg ${cardColor} border border-gray-20 px-5`} key={index}>
                <FaqAccordion
                  question={item.question}
                  answer={item.answer}
                  isQuestionBigger
                  textColor={textColor}
                  percentageDiscount={percentageDiscount}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
