import { useState, type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import featureImage from '../../assets/images/DriveMobile.png';

const CoreFeaturesSection = (): JSX.Element => {
  const { t } = useTranslation();
  const accordionTitles = t('AccordionSection.titles', { returnObjects: true }) as string[];
  const accordionDescriptions = t('AccordionSection.descriptions', { returnObjects: true }) as string[];
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleAccordionClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="flex w-full flex-col items-start justify-center gap-6 bg-neutral-17 px-5 py-10 lg:py-20 lg:pl-10 xl:pl-32 3xl:pl-80">
      <div className="h-[1px] bg-neutral-35 w-full mb-12 lg:mb-20" />
      <div className="flex w-full flex-row gap-8 justify-center">
        <div className="flex w-full flex-col gap-6 lg:w-[540px]">
          {Array.isArray(accordionTitles) &&
            accordionTitles.map((title: string, index: number) => (
              <button
                key={index}
                onClick={() => handleAccordionClick(index)}
                className={`flex flex-col rounded-16 bg-white text-left transition-all duration-300 ${
                  activeIndex === index ? 'gap-6 p-8' : 'gap-0 px-8 py-4'
                }`}
                aria-expanded={activeIndex === index}
              >
                <span className="flex flex-row items-center gap-4 text-2xl font-medium text-primary">
                  {index + 1}
                  <p className="text-xl font-medium text-gray-100">{title}</p>
                </span>
                <div
                  className={`grid transition-all duration-300 ${
                    activeIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-base font-normal leading-tight text-gray-55">{accordionDescriptions[index]}</p>
                  </div>
                </div>
              </button>
            ))}
        </div>

        <div className="hidden flex-row items-end gap-8 lg:flex lg:w-[540px]">
          <img
            src={featureImage}
            alt="Internxt Drive Desktop Image"
            className="lg:w-[220px] lg:h-[460px] w-full h-[188px] "
          />
        </div>
      </div>
    </section>
  );
};

export default CoreFeaturesSection;
