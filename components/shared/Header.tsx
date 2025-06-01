'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const pathname = usePathname();
  const isNewProductPage = pathname === '/products/new';

  return (
    <header className="sticky top-0 h-[90px] min-w-full z-[1000] transition-[height] duration-150 bg-white shadow-sm px-6 flex items-center justify-between">
      <h1 className="text-xl font-bold">📦 Product Manager</h1>
      <Link
        href={isNewProductPage ? '/products' : '/products/new'}
        className="px-3 py-2  bg-blue-600 font-bold text-sm text-white rounded-md hover:bg-blue-900"
      >
        {isNewProductPage ? '상품 목록' : '상품 등록'}
      </Link>
    </header>
  );
}
