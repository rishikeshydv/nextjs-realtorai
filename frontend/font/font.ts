import { Poppins } from 'next/font/google';
import { Onest } from 'next/font/google';
const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['400', '500', '600', '700', '800', '900']
  });

  const onest = Onest({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-onest',
    weight: ['400', '500', '600', '700', '800', '900']
  });

  export { poppins, onest };