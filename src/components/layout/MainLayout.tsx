import { ReactNode } from 'react';
import { ThreeBackground } from '../three/ThreeBackground';
import { useTheme } from '../../lib/theme-context';

interface MainLayoutProps {
  children: ReactNode;
  showBackground?: boolean;
  backgroundVariant?: 'default' | 'light';
}

export const MainLayout = ({ children, showBackground = true, backgroundVariant = 'default' }: MainLayoutProps) => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-700 w-full overflow-x-hidden">
      {showBackground && <ThreeBackground variant="light" />}
      <main className="relative z-10 pt-24 pb-24 w-full">
        {children}
      </main>
    </div>
  );
};
