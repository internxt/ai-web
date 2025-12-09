/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Transition, Disclosure } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { CaretDown, CaretUp } from '@phosphor-icons/react';
import instagramIcon from '../../assets/images/instagram.png';
import youtubeIcon from '../../assets/images/youtube.png';
import redditIcon from '../../assets/images/Reddit.png';
import linkedinIcon from '../../assets/images/linkedin.png';
import twitterIcon from '../../assets/images/twitter.png';
import internxtLogo from '../../logo_dark.svg';
import GDPRLogo from '../../assets/images/GDPR.png';
import appStoreLogo from '../../assets/images/AppStore.png';
import playStoreLogo from '../../assets/images/GooglePlay.png';
import qr from '../../assets/images/qr.png';
interface PlatformLinks {
  iPhone: string;
  Android: string;
}

export default function Footer({ lang = 'en', hideNewsletter = false, darkMode = false }) {
  const { t } = useTranslation('footer');
  const [email, setEmail] = useState('');
  const [platforms, setPlatforms] = useState<PlatformLinks | null>(null);

  const year = new Date().getFullYear();

  useEffect(() => {
    fetch('/api/download')
      .then((res) => res.json())
      .then((data) => {
        setPlatforms(data.platforms);
      })
      .catch((err) => console.error('Error fetching platforms:', err));
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          groups: [process.env.REACT_APP_KLAVIYO_LIST_ID],
        }),
      });

      if (response.ok) {
        alert(t('NewsletterSection.successMessage') || 'Successfully submitted');
        setEmail('');
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      alert(t('NewsletterSection.errorMessage') || 'Something went wrong!');
    }
  };

  const getImage = (path: string) => {
    return path;
  };

  return (
    <section
      id="footer"
      className={`flex w-full flex-col overflow-hidden lg:pb-10 ${darkMode ? 'bg-[#1C1C1C] text-white' : ''}`}
      style={{ background: darkMode ? '' : 'linear-gradient(180deg, #FFFFFF 0%, #E5EFFF 100%)' }}
    >
      <div className="flex w-full flex-col items-center justify-center px-5 pt-10 sm:py-12 lg:px-10 lg:pt-16 xl:px-32 3xl:px-80">
        <div className={`w-full ${darkMode ? 'bg-cool-gray-90' : 'bg-cool-gray-10'} mb-10 h-[1px] lg:mb-10`} />

        <div className="flex w-full flex-col gap-6 lg:flex-row lg:justify-between lg:gap-8">
          <div className="flex w-full flex-row items-end gap-6 lg:w-1/2 2xl:w-1/3">
            <div className="flex flex-col items-start justify-between gap-9">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-medium">{t('DownloadApp.title')}</h2>
                <p className={`max-w-[380px] text-sm ${darkMode ? 'text-cool-gray-30' : 'text-gray-80'}`}>
                  {t('DownloadApp.description')}
                </p>
              </div>

              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <div className="flex gap-4">
                  <img
                    src={appStoreLogo}
                    width={148}
                    height={44}
                    className="cursor-pointer"
                    alt="Download on the App Store"
                    onClick={() => platforms && window.open(platforms.iPhone, '_blank', 'noopener,noreferrer')}
                  />
                  <img
                    src={playStoreLogo}
                    width={148}
                    height={44}
                    className="cursor-pointer"
                    alt="Get it on Google Play"
                    onClick={() => platforms && window.open(platforms.Android, '_blank', 'noopener,noreferrer')}
                  />
                </div>
              </div>
            </div>
            <img
              src={qr}
              width={125}
              height={125}
              className="cursor-pointer pl-10 hidden lg:flex"
              alt="QR code for download Internxt APP"
            />
          </div>

          {!hideNewsletter && (
            <div className="flex w-full flex-col gap-3 lg:w-1/3 2xl:w-1/3">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-medium">{t('NewsletterSection.title')}</h2>
                <p className={`text-sm ${darkMode ? 'text-cool-gray-30' : 'text-gray-80'}`}>
                  {t('NewsletterSection.description')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('NewsletterSection.input')}
                  className={`flex-1 rounded-lg border px-4 py-2.5 text-base outline-none transition-all
                    ${
                      darkMode
                        ? 'border-cool-gray-70 bg-cool-gray-90 focus:border-primary'
                        : 'border-cool-gray-20 bg-white focus:border-blue-50'
                    } focus:ring focus:ring-primary focus:ring-opacity-20`}
                  required
                />
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-4 py-2.5 text-base font-medium text-white 
                    transition-all hover:bg-primary-dark active:bg-primary-dark"
                >
                  {t('NewsletterSection.cta')}
                </button>
              </form>

              <span className="text-sm text-gray-40">
                {t('NewsletterSection.privacy')}{' '}
                <a href="/legal" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-30">
                  {t('NewsletterSection.privacyLink')}
                </a>
              </span>
            </div>
          )}
        </div>

        <div className={`w-full ${darkMode ? 'bg-cool-gray-90' : 'bg-cool-gray-10'} h-[1px] lg:my-10`} />

        <footer className="flex w-full items-center justify-center">
          <div className="hidden w-full flex-col items-center justify-center md:space-y-16 lg:flex">
            <div className="flex w-full flex-row justify-between md:justify-between">
              <div className="flex max-w-[30%] flex-1 flex-col items-center lg:flex-none">
                <div className="flex flex-shrink-0 flex-col space-y-3">
                  <p className={`text-xs font-semibold ${darkMode ? 'text-gray-1' : 'text-gray-100'}`}>
                    {t('FooterSection.sections.products.title')}
                  </p>
                  <div
                    className={`flex flex-col gap-1 text-xs ${darkMode ? 'text-cool-gray-30' : 'text-cool-gray-60'}`}
                  >
                    <a
                      href="https://internxt.com/drive"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {t('FooterSection.sections.products.drive')}
                    </a>

                    <a
                      href="https://internxt.com/cloud-object-storage"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-row items-center hover:text-primary"
                    >
                      {t('FooterSection.sections.products.objStorage')}
                    </a>

                    <a
                      href="https://internxt.com/antivirus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="items-center hover:text-primary"
                    >
                      {t('FooterSection.sections.products.antivirus')}
                      <span
                        className={`ml-2 h-max items-center justify-center rounded-2 ${
                          darkMode ? 'bg-primary/10' : 'bg-primary'
                        } bg-opacity-15 px-1 py-0.5 text-10 font-semibold text-primary`}
                      >
                        {t('FooterSection.new')}
                      </span>
                    </a>

                    <a
                      href="https://send.internxt.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-row items-center hover:text-primary"
                    >
                      {t('FooterSection.sections.products.send')}
                    </a>

                    <a
                      href="https://internxt.com/vpn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="items-center hover:text-primary"
                    >
                      {t('FooterSection.sections.products.vpn')}
                      <span
                        className={`ml-2 h-max items-center justify-center rounded-2 ${
                          darkMode ? 'bg-primary/10' : 'bg-primary'
                        } bg-opacity-15 px-1 py-0.5 text-10 font-semibold text-primary`}
                      >
                        {t('FooterSection.new')}
                      </span>
                    </a>

                    <a
                      href="https://internxt.com/cleaner"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="items-center hover:text-primary"
                    >
                      {t('FooterSection.sections.products.cleaner')}
                      <span
                        className={`ml-2 h-max items-center justify-center rounded-2 ${
                          darkMode ? 'bg-primary/10' : 'bg-primary'
                        } bg-opacity-15 px-1 py-0.5 text-10 font-semibold text-primary`}
                      >
                        {t('FooterSection.new')}
                      </span>
                    </a>

                    <a
                      href="https://internxt.com/meet"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="items-center hover:text-primary"
                    >
                      {t('FooterSection.sections.products.meet')}
                      <span
                        className={`ml-2 h-max items-center justify-center rounded-2 ${
                          darkMode ? 'bg-primary/10' : 'bg-primary'
                        } bg-opacity-15 px-1 py-0.5 text-10 font-semibold text-primary`}
                      >
                        {t('FooterSection.new')}
                      </span>
                    </a>

                    <a
                      href="https://internxt.com/business"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex max-w-[250px] items-center hover:text-primary"
                    >
                      {t('FooterSection.sections.products.business')}
                    </a>

                    <a
                      href="https://internxt.com/family"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex max-w-[250px] items-center hover:text-primary"
                    >
                      {t('FooterSection.sections.products.family')}
                    </a>

                    <a
                      href="https://internxt.com/pricing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {t('FooterSection.sections.products.pricing')}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex max-w-[14%] flex-1 flex-col items-center text-gray-100 lg:flex-none">
                <div className="flex flex-shrink-0 flex-col space-y-3">
                  <p className={`text-xs font-semibold ${darkMode ? 'text-gray-1' : 'text-gray-100'}`}>
                    {t('FooterSection.sections.company.title')}
                  </p>
                  <div
                    className={`flex flex-col gap-1 text-xs ${darkMode ? 'text-cool-gray-30' : 'text-cool-gray-60'}`}
                  >
                    <a
                      href="https://internxt.com/about"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {t('FooterSection.sections.company.about')}
                    </a>

                    <a
                      href="https://internxt.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {t('FooterSection.sections.company.privacy')}
                    </a>

                    <a
                      href={`https://blog.internxt.com/${
                        lang === 'es' ? 'es/como-internxt-protege-tus-datos/' : 'how-internxt-protects-your-data/'
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {t('FooterSection.sections.company.security')}
                    </a>

                    <a
                      href="https://internxt.com/open-source"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex max-w-[200px] flex-row items-center hover:text-primary"
                    >
                      {t('FooterSection.sections.company.openSource')}
                    </a>

                    <a
                      href="https://internxt.com/legal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {t('FooterSection.sections.company.legal')}
                    </a>

                    <a
                      href="https://internxt.com/green-cloud-computing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex max-w-[200px] flex-row items-center hover:text-primary"
                    >
                      {t('FooterSection.sections.company.sustainability')}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex max-w-[14%] flex-1 flex-col items-center text-gray-100 lg:flex-none">
                <div className="flex flex-shrink-0 flex-col space-y-3">
                  <p className={`text-xs font-semibold ${darkMode ? 'text-gray-1' : 'text-gray-100'}`}>
                    {t('FooterSection.sections.join.title')}
                  </p>
                  <div
                    className={`flex flex-col gap-1 text-xs ${darkMode ? 'text-cool-gray-30' : 'text-cool-gray-60'}`}
                  >
                    <a
                      href="https://drive.internxt.com/new"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {t('FooterSection.sections.join.signup')}
                    </a>
                    <a
                      href="https://drive.internxt.com/login"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {t('FooterSection.sections.join.login')}
                    </a>
                    <a
                      href="https://help.internxt.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:text-primary"
                    >
                      {t('FooterSection.sections.join.support')}
                    </a>

                    <a
                      href="/whitepaper/internxt-white-paper-1.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="hover:text-primary"
                    >
                      {t('FooterSection.sections.join.whitePaper')}
                    </a>

                    <a
                      href="https://github.com/internxt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {t('FooterSection.sections.join.github')}
                    </a>

                    <a
                      href="https://internxt.com/affiliates"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {t('FooterSection.sections.join.affiliates')}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex max-w-[14%] flex-1 flex-col items-center text-gray-100 lg:flex-none">
                <div className="flex flex-shrink-0 flex-col space-y-3">
                  <p className={`text-xs font-semibold ${darkMode ? 'text-gray-1' : 'text-gray-100'}`}>
                    {t('FooterSection.sections.resources.title')}
                  </p>
                  <div
                    className={`flex flex-col gap-1 text-xs ${darkMode ? 'text-cool-gray-30' : 'text-cool-gray-60'}`}
                  >
                    <a
                      href={`https://blog.internxt.com/${lang === 'es' ? 'es/' : ''}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {t('FooterSection.sections.resources.blog')}
                    </a>
                    <a
                      href="https://internxt.com/cloud-storage-comparison"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full max-w-[160px] hover:text-primary"
                    >
                      {t('FooterSection.sections.resources.comparison')}
                    </a>

                    <a
                      href="https://internxt.com/pcloud-alternative"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full max-w-[160px] hover:text-primary"
                    >
                      {t('FooterSection.sections.resources.pCloudAlternative')}
                    </a>
                    <a
                      href="https://internxt.com/dropbox-alternative"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full max-w-[160px] hover:text-primary"
                    >
                      {t('FooterSection.sections.resources.dropboxAlternative')}
                    </a>
                    <a
                      href="https://internxt.com/mega-alternative"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full max-w-[160px] hover:text-primary"
                    >
                      {t('FooterSection.sections.resources.megaAlternative')}
                    </a>

                    <a
                      href="https://internxt.com/koofr-alternative"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full max-w-[160px] hover:text-primary"
                    >
                      {t('FooterSection.sections.resources.koofrAlternative')}
                    </a>

                    <a
                      href="https://internxt.com/icedrive-alternative"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full max-w-[160px] hover:text-primary"
                    >
                      {t('FooterSection.sections.resources.icedriveAlternative')}
                    </a>
                    <a
                      href="https://internxt.com/onedrive-alternative"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full max-w-[160px] hover:text-primary"
                    >
                      {t('FooterSection.sections.resources.onedriveAlternative')}
                    </a>
                    <a
                      href="https://internxt.com/google-drive-alternative"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full max-w-[160px] hover:text-primary"
                    >
                      {t('FooterSection.sections.resources.googleDriveAlternative')}
                    </a>
                    <a
                      href="https://internxt.com/drime-alternative"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full max-w-[160px] hover:text-primary"
                    >
                      {t('FooterSection.sections.resources.drimeAlternative')}
                    </a>
                    <a
                      href="https://internxt.com/degoo-alternative"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full max-w-[160px] hover:text-primary"
                    >
                      {t('FooterSection.sections.resources.degooAlternative')}
                    </a>
                    <a
                      href="https://internxt.com/filejump-alternative"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full max-w-[160px] hover:text-primary"
                    >
                      {t('FooterSection.sections.resources.fileJumpAlternative')}
                    </a>
                    <a
                      href="https://internxt.com/elephantdrive-alternative"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full max-w-[160px] hover:text-primary"
                    >
                      {t('FooterSection.sections.resources.elephantDriveAlternative')}
                    </a>

                    <a
                      href="https://internxt.com/what-does-google-know-about-me"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="items-center hover:text-primary"
                    >
                      {t('FooterSection.sections.resources.whatGoogleKnowsAboutMe')}
                    </a>
                    <a
                      href="https://internxt.com/webdav"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="items-center hover:text-primary"
                    >
                      {t('FooterSection.sections.resources.WebDAV')}
                    </a>
                    <a
                      href="https://internxt.com/nas"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="items-center hover:text-primary"
                    >
                      {t('FooterSection.sections.resources.nas')}
                    </a>
                    <a
                      href="https://internxt.com/coupons"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="items-center hover:text-primary"
                    >
                      {t('FooterSection.sections.resources.coupons')}
                    </a>
                    <a
                      href="https://internxt.com/reviews"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="items-center hover:text-primary"
                    >
                      {t('FooterSection.sections.resources.reviews')}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex max-w-[18%] flex-1 flex-col items-center text-gray-100 lg:flex-none">
                <div className="flex flex-shrink-0 flex-col space-y-3">
                  <p className={`text-xs font-semibold ${darkMode ? 'text-gray-1' : 'text-gray-100'}`}>
                    {t('FooterSection.sections.tools.title')}
                  </p>
                  <div
                    className={`flex flex-col gap-1 text-xs ${darkMode ? 'text-cool-gray-30' : 'text-cool-gray-60'}`}
                  >
                    <a
                      href="https://internxt.com/byte-converter"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {t('FooterSection.sections.tools.byteConverter')}
                    </a>
                    <a
                      href="https://internxt.com/temporary-email"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {t('FooterSection.sections.tools.temporaryEmail')}
                    </a>
                    <a
                      href="https://internxt.com/password-checker"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {t('FooterSection.sections.tools.passwordChecker')}
                    </a>
                    <a
                      href="https://internxt.com/virus-scanner"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {t('FooterSection.sections.tools.fileVirusScan')}
                    </a>
                    <a
                      href="https://internxt.com/password-generator"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="items-center hover:text-primary"
                    >
                      {t('FooterSection.sections.tools.passwordGenerator')}
                    </a>
                    <a
                      href="https://internxt.com/file-converter"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="items-center hover:text-primary"
                    >
                      {t('FooterSection.sections.tools.fileConverter')}
                    </a>
                    <a
                      href="https://internxt.com/dark-web-monitor"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="items-center hover:text-primary"
                    >
                      {t('FooterSection.sections.tools.haveIBeenPwned')}
                    </a>
                    <a
                      href="https://internxt.com/metadata-remover"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="items-center hover:text-primary"
                    >
                      {t('FooterSection.sections.tools.metadataRemover')}
                    </a>
                    <a
                      href="https://internxt.com/ai-detector"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="items-center hover:text-primary"
                    >
                      {t('FooterSection.sections.tools.aiDetector')}
                    </a>
                    <a
                      href="https://internxt.com/file-compressor"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="items-center hover:text-primary"
                    >
                      {t('FooterSection.sections.tools.fileCompressor')}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex max-w-[14%] flex-1 flex-col items-center text-gray-100 lg:flex-none">
                <div className="flex flex-shrink-0 flex-col space-y-3">
                  <p className={`text-xs font-semibold ${darkMode ? 'text-gray-1' : 'text-gray-100'}`}>
                    {t('FooterSection.sections.features.title')}
                  </p>
                  <div
                    className={`flex flex-col gap-1 text-xs ${darkMode ? 'text-cool-gray-30' : 'text-cool-gray-60'}`}
                  >
                    <a
                      href="https://internxt.com/private-cloud-storage-solutions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="items-center hover:text-primary"
                    >
                      {t('FooterSection.sections.features.privateCloud')}
                    </a>
                    <a
                      href="https://internxt.com/cloud-storage-backup-solutions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="items-center hover:text-primary"
                    >
                      {t('FooterSection.sections.features.cloudBakcup')}
                    </a>
                    <a
                      href="https://internxt.com/gdpr-cloud-storage"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="items-center hover:text-primary"
                    >
                      {t('FooterSection.sections.features.GDPRCloud')}
                    </a>
                    <a
                      href="https://internxt.com/cloud-storage-for-photos"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="items-center hover:text-primary"
                    >
                      {t('FooterSection.sections.features.cloudPhotos')}
                    </a>
                    <a
                      href="https://internxt.com/cloud-storage-for-videos"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="items-center hover:text-primary"
                    >
                      {t('FooterSection.sections.features.cloudVideo')}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className={`w-full ${darkMode ? 'bg-cool-gray-90' : 'bg-cool-gray-10'} h-[1px] lg:mb-10`} />

            <div className="flex w-full flex-row justify-between">
              <div className="flex flex-row gap-10">
                <img src={GDPRLogo} alt="GDPRLogo" width={150} height={48} />
              </div>

              <div className="flex flex-row items-center space-x-4">
                <a href="/" target="_blank" rel="noopener noreferrer" className="flex flex-shrink-0">
                  <img width={110} height={12} loading="lazy" src={internxtLogo} alt="Internxt logo" />
                </a>
                <p className={`text-sm font-medium ${darkMode ? 'text-cool-gray-30' : 'text-cool-gray-60'}`}>
                  {t('FooterSection.copyright.line1') + year + t('FooterSection.copyright.line2')}
                </p>
              </div>

              <div className="flex flex-row items-center gap-5">
                <a href="https://twitter.com/Internxt" target="_blank" rel="noopener noreferrer">
                  <img width={15} height={14} loading="lazy" src={twitterIcon} draggable="false" alt="twitter icon" />
                </a>
                <a href="https://www.reddit.com/r/internxt/" target="_blank" rel="noopener noreferrer">
                  <img width={16} height={16} loading="lazy" src={redditIcon} draggable="false" alt="Reddit icon" />
                </a>
                <a href="https://linkedin.com/company/internxt" target="_blank" rel="noopener noreferrer">
                  <img width={16} height={16} loading="lazy" src={linkedinIcon} draggable="false" alt="linkedin icon" />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCW2SxWdVEAEACYuejCgpGwg/featured"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img loading="lazy" width={16} height={16} src={youtubeIcon} draggable="false" alt="youtube icon" />
                </a>
                <a href="https://instagram.com/internxt/" target="_blank" rel="noopener noreferrer">
                  <img
                    loading="lazy"
                    width={16}
                    height={16}
                    src={instagramIcon}
                    draggable="false"
                    alt="instagram icon"
                  />
                </a>
              </div>
            </div>
          </div>

          <div
            className={`${
              darkMode ? 'bg-[#1C1C1C] text-white' : 'bg-gray-5 bg-opacity-50'
            } flex flex-col overflow-hidden lg:hidden`}
          >
            <Disclosure as="div" className="w-screen">
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`${
                      darkMode ? 'text-gray-1' : 'text-gray-100'
                    } flex w-full items-center justify-between px-6 py-4 text-lg font-medium`}
                  >
                    <span className="flex flex-row">{t('FooterSection.sections.products.title')}</span>
                    <CaretDown className={`${open ? 'hidden' : 'flex'} text-gray-80`} weight="bold" />
                    <CaretUp className={`${!open ? 'hidden' : 'flex'} text-gray-80`} weight="bold" />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-200 ease-out"
                    enterFrom="-translate-y-10 opacity-0"
                    enterTo="translate-y-0 opacity-100"
                    leave="transition duration-200 ease-out"
                  >
                    <Disclosure.Panel
                      className={`flex flex-col px-6 font-semibold text-gray-100 ${!open ? 'hidden' : 'flex'} ${
                        darkMode ? 'bg-gray-71 text-green-120' : 'bg-gray-1 text-gray-60'
                      } space-y-8 p-4`}
                    >
                      <a href="https://internxt.com/drive" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.products.drive')}
                      </a>
                      <a href="https://internxt.com/cloud-object-storage" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.products.objStorage')}
                      </a>
                      <a href="https://internxt.com/antivirus" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.products.antivirus')}
                      </a>
                      <a href="https://send.internxt.com" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.products.send')}
                      </a>
                      <a href="https://internxt.com/vpn" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.products.vpn')}
                      </a>
                      <a href="https://internxt.com/cleaner" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.products.cleaner')}
                      </a>
                      <a href="https://internxt.com/meet" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.products.meet')}
                      </a>
                      <a href="https://internxt.com/business" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.products.business')}
                      </a>
                      <a href="https://internxt.com/family" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.products.family')}
                      </a>
                      <a href="https://internxt.com/pricing" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.products.pricing')}
                      </a>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" className="w-screen">
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`${
                      darkMode ? 'text-gray-1' : 'text-gray-100'
                    } flex w-full items-center justify-between px-6 py-4 text-lg font-medium`}
                  >
                    <span className="flex flex-row">{t('FooterSection.sections.company.title')}</span>
                    <CaretDown className={`${open ? 'hidden' : 'flex'} text-gray-80`} weight="bold" />
                    <CaretUp className={`${!open ? 'hidden' : 'flex'} text-gray-80`} weight="bold" />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-200 ease-out"
                    enterFrom="-translate-y-10 opacity-0"
                    enterTo="translate-y-0 opacity-100"
                    leave="transition duration-200 ease-out"
                  >
                    <Disclosure.Panel
                      className={`flex flex-col bg-gray-1 px-6 font-semibold ${!open ? 'hidden' : 'flex'} ${
                        darkMode ? 'bg-gray-71 text-green-120' : 'text-gray-60'
                      } space-y-8 p-4`}
                    >
                      <a href="https://internxt.com/about" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.company.about')}
                      </a>
                      <a href="https://internxt.com/privacy" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.company.privacy')}
                      </a>
                      <a
                        href={`https://blog.internxt.com/${
                          lang === 'es' ? 'es/como-internxt-protege-tus-datos/' : 'how-internxt-protects-your-data/'
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('FooterSection.sections.company.security')}
                      </a>
                      <a href="https://internxt.com/open-source" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.company.openSource')}
                      </a>
                      <a href="https://internxt.com/legal" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.company.legal')}
                      </a>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" className="w-screen">
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`${
                      darkMode ? 'text-gray-1' : 'text-gray-100'
                    } flex w-full items-center justify-between px-6 py-4 text-lg font-medium`}
                  >
                    <span className="flex flex-row">{t('FooterSection.sections.join.title')}</span>
                    <CaretDown className={`${open ? 'hidden' : 'flex'} text-gray-80`} weight="bold" />
                    <CaretUp className={`${!open ? 'hidden' : 'flex'} text-gray-80`} weight="bold" />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-200 ease-out"
                    enterFrom="-translate-y-10 opacity-0"
                    enterTo="translate-y-0 opacity-100"
                    leave="transition duration-200 ease-out"
                  >
                    <Disclosure.Panel
                      className={`flex flex-col bg-gray-1 px-6 font-semibold ${!open ? 'hidden' : 'flex'} ${
                        darkMode ? 'bg-gray-71 text-green-120' : 'text-gray-60'
                      } space-y-8 p-4`}
                    >
                      <a href="https://drive.internxt.com/new" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.join.signup')}
                      </a>
                      <a href="https://drive.internxt.com/login" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.join.login')}
                      </a>
                      <a href="https://help.internxt.com" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.join.support')}
                      </a>
                      <a
                        href={getImage('/whitepaper/internxt-white-paper-1.pdf')}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                      >
                        {t('FooterSection.sections.join.whitePaper')}
                      </a>
                      <a href="https://github.com/internxt" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.join.github')}
                      </a>
                      <a href="https://internxt.com/affiliates" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.join.affiliates')}
                      </a>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" className="w-screen">
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`${
                      darkMode ? 'text-gray-1' : 'text-gray-100'
                    } flex w-full items-center justify-between px-6 py-4 text-lg font-medium`}
                  >
                    <span className="flex flex-row">{t('FooterSection.sections.resources.title')}</span>
                    <CaretDown className={`${open ? 'hidden' : 'flex'} text-gray-80`} weight="bold" />
                    <CaretUp className={`${!open ? 'hidden' : 'flex'} text-gray-80`} weight="bold" />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-200 ease-out"
                    enterFrom="-translate-y-10 opacity-0"
                    enterTo="translate-y-0 opacity-100"
                    leave="transition duration-200 ease-out"
                  >
                    <Disclosure.Panel
                      className={`flex flex-col bg-gray-1 px-6 font-semibold ${!open ? 'hidden' : 'flex'} ${
                        darkMode ? 'bg-gray-71 text-green-120' : 'text-gray-60'
                      } space-y-8 p-4`}
                    >
                      <a
                        href={`https://blog.internxt.com/${lang === 'es' ? 'es/' : ''}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('FooterSection.sections.resources.blog')}
                      </a>
                      <a href="https://internxt.com/cloud-storage-comparison" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.resources.comparison')}
                      </a>
                      <a href="https://internxt.com/pcloud-alternative" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.resources.pCloudAlternative')}
                      </a>
                      <a href="https://internxt.com/dropbox-alternative" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.resources.dropboxAlternative')}
                      </a>
                      <a href="https://internxt.com/mega-alternative" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.resources.megaAlternative')}
                      </a>
                      <a href="https://internxt.com/google-drive-alternative" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.resources.googleDriveAlternative')}
                      </a>
                      <a href="https://internxt.com/koofr-alternative" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.resources.koofrAlternative')}
                      </a>
                      <a href="https://internxt.com/icedrive-alternative" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.resources.icedriveAlternative')}
                      </a>
                      <a href="https://internxt.com/onedrive-alternative" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.resources.onedriveAlternative')}
                      </a>
                      <a href="https://internxt.com/drime-alternative" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.resources.drimeAlternative')}
                      </a>
                      <a href="https://internxt.com/degoo-alternative" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.resources.degooAlternative')}
                      </a>
                      <a href="https://internxt.com/filejump-alternative" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.resources.fileJumpAlternative')}
                      </a>
                      <a
                        href="https://internxt.com/elephantdrive-alternative"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('FooterSection.sections.resources.elephantDriveAlternative')}
                      </a>
                      <a
                        href="https://internxt.com/what-does-google-know-about-me"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('FooterSection.sections.resources.whatGoogleKnowsAboutMe')}
                      </a>
                      <a href="https://internxt.com/webdav" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.resources.WebDAV')}
                      </a>
                      <a href="https://internxt.com/nas" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.resources.nas')}
                      </a>
                      <a href="https://internxt.com/coupons" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.resources.coupons')}
                      </a>
                      <a href="https://internxt.com/reviews" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.resources.reviews')}
                      </a>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" className="w-screen">
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`${
                      darkMode ? 'text-gray-1' : 'text-gray-100'
                    } flex w-full items-center justify-between px-6 py-4 text-lg font-medium`}
                  >
                    <span className="flex flex-row">{t('FooterSection.sections.tools.title')}</span>
                    <CaretDown className={`${open ? 'hidden' : 'flex'} text-gray-80`} weight="bold" />
                    <CaretUp className={`${!open ? 'hidden' : 'flex'} text-gray-80`} weight="bold" />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-200 ease-out"
                    enterFrom="-translate-y-10 opacity-0"
                    enterTo="translate-y-0 opacity-100"
                    leave="transition duration-200 ease-out"
                  >
                    <Disclosure.Panel
                      className={`flex flex-col bg-gray-1 px-6 font-semibold ${!open ? 'hidden' : 'flex'} ${
                        darkMode ? 'bg-gray-71 text-green-120' : 'text-gray-60'
                      } space-y-8 p-4`}
                    >
                      <a href="https://internxt.com/byte-converter" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.tools.byteConverter')}
                      </a>
                      <a href="https://internxt.com/temporary-email" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.tools.temporaryEmail')}
                      </a>
                      <a href="https://internxt.com/password-checker" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.tools.passwordChecker')}
                      </a>
                      <a href="https://internxt.com/virus-scanner" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.tools.fileVirusScan')}
                      </a>
                      <a href="https://internxt.com/password-generator" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.tools.passwordGenerator')}
                      </a>
                      <a href="https://internxt.com/file-converter" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.tools.fileConverter')}
                      </a>
                      <a href="https://internxt.com/dark-web-monitor" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.tools.haveIBeenPwned')}
                      </a>
                      <a href="https://internxt.com/metadata-remover" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.tools.metadataRemover')}
                      </a>
                      <a href="https://internxt.com/ai-detector" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.tools.aiDetector')}
                      </a>
                      <a href="https://internxt.com/business" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.products.business')}
                      </a>
                      <a href="https://internxt.com/family" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.products.family')}
                      </a>
                      <a href="https://internxt.com/pricing" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.products.pricing')}
                      </a>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" className="w-screen">
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`${
                      darkMode ? 'text-gray-1' : 'text-gray-100'
                    } flex w-full items-center justify-between px-6 py-4 text-lg font-medium`}
                  >
                    <span className="flex flex-row">{t('FooterSection.sections.features.title')}</span>
                    <CaretDown className={`${open ? 'hidden' : 'flex'} text-gray-80`} weight="bold" />
                    <CaretUp className={`${!open ? 'hidden' : 'flex'} text-gray-80`} weight="bold" />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-200 ease-out"
                    enterFrom="-translate-y-10 opacity-0"
                    enterTo="translate-y-0 opacity-100"
                    leave="transition duration-200 ease-out"
                  >
                    <Disclosure.Panel
                      className={`flex flex-col bg-gray-1 px-6 font-semibold ${!open ? 'hidden' : 'flex'} ${
                        darkMode ? 'bg-gray-71 text-green-120' : 'text-gray-60'
                      } space-y-8 p-4`}
                    >
                      <a
                        href="https://internxt.com/private-cloud-storage-solutions"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('FooterSection.sections.features.privateCloud')}
                      </a>
                      <a
                        href="https://internxt.com/cloud-storage-backup-solutions"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('FooterSection.sections.features.cloudBakcup')}
                      </a>
                      <a href="https://internxt.com/gdpr-cloud-storage" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.features.GDPRCloud')}
                      </a>
                      <a href="https://internxt.com/cloud-storage-for-photos" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.features.cloudPhotos')}
                      </a>
                      <a href="https://internxt.com/cloud-storage-for-videos" target="_blank" rel="noopener noreferrer">
                        {t('FooterSection.sections.features.cloudVideo')}
                      </a>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>

            <div className="flex flex-col items-center space-y-4 py-10 text-gray-100">
              <div className="flex flex-row gap-5">
                <a href="https://twitter.com/Internxt" target="_blank" rel="noopener noreferrer">
                  <img width={15} height={14} loading="lazy" src={twitterIcon} draggable="false" alt="twitter icon" />
                </a>
                <a href="https://www.reddit.com/r/internxt/" target="_blank" rel="noopener noreferrer">
                  <img width={16} height={16} loading="lazy" src={redditIcon} draggable="false" alt="Reddit icon" />
                </a>
                <a href="https://linkedin.com/company/internxt" target="_blank" rel="noopener noreferrer">
                  <img width={16} height={16} loading="lazy" src={linkedinIcon} draggable="false" alt="linkedin icon" />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCW2SxWdVEAEACYuejCgpGwg/featured"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img loading="lazy" width={16} height={16} src={youtubeIcon} draggable="false" alt="youtube icon" />
                </a>
                <a href="https://instagram.com/internxt/" target="_blank" rel="noopener noreferrer">
                  <img
                    loading="lazy"
                    width={16}
                    height={16}
                    src={instagramIcon}
                    draggable="false"
                    alt="instagram icon"
                  />
                </a>
              </div>

              <p className={`text-xs ${darkMode ? 'text-cool-gray-30' : 'text-cool-gray-60'}`}>
                {t('FooterSection.copyright.line1') + year + t('FooterSection.copyright.line2')}
              </p>

              <a href="/" target="_blank" rel="noopener noreferrer" className="flex flex-shrink-0 text-gray-100">
                <img width={96} height={10.5} src={internxtLogo} loading="lazy" alt="Internxt logo" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
