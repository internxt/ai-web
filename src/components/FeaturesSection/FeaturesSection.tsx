import { useTranslation } from 'react-i18next';
import { blueText } from '../../utils/format-text';
import featureImage from '../../assets/images/DriveMenu.png';

const FeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-neutral-17 flex flex-col p-10 gap-8 lg:p-20 lg:gap-16 justify-center px-8 lg:px-10 xl:px-32 3xl:px-60">
      <div className="h-[1px] bg-neutral-35 w-full" />

      <p className={`lg:hidden text-start text-30 font-bold text-gray-100 leading-tight whitespace-pre-line`}>
        {blueText(t('BuildToKeepPrivateSection.title_mobile'))}
      </p>

      <p
        className={`hidden lg:block text-center lg:text-3xl font-bold text-gray-100 leading-tight whitespace-pre-line`}
      >
        {blueText(t('BuildToKeepPrivateSection.title_desktop'))}
      </p>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
        <img
          src={featureImage}
          alt="Internxt Drive Desktop Image"
          className="lg:w-[500px] lg:h-[320px] w-full h-[188px]"
        />
        <div className="flex w-full lg:w-[540px] flex-col gap-6 lg:gap-8 ">
          <div className="flex flex-col lg:gap-6 gap-4 lg:py-4 py-2">
            <p className="text-xl font-medium text-gray-100 leading-tight">{t('BuildToKeepPrivateSection.titles.0')}</p>
            <p className="text-base text-gray-50 leading-tight">{t('BuildToKeepPrivateSection.descriptions.0')}</p>
          </div>
          <div className="flex flex-col lg:gap-6 gap-4 lg:py-4 py-2">
            <p className="text-xl font-medium text-gray-100 leading-tight">{t('BuildToKeepPrivateSection.titles.1')}</p>
            <p className="text-base text-gray-50 leading-tight">{t('BuildToKeepPrivateSection.descriptions.1')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
