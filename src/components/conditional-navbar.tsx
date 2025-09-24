'use client';

import { usePathname } from 'next/navigation';
import Navbar from './navbar';

export function ConditionalNavbar() {
  const pathname = usePathname();
  
 
  if (pathname?.startsWith('/manager')) {
    return null;
  }
  
  return <Navbar />;
}
