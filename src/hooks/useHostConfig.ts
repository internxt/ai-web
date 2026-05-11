import { useMemo } from 'react';
import logoInternxt from '../assets/images/logo_dark.svg';

export const useHostConfig = () => {
  const config = useMemo(() => {
    return {
      model: 'default-model',
      assets: {
        brandName: 'Internxt',
        logo: logoInternxt,
      }
    };
  }, []);

  
  return config;
};