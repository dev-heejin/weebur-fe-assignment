export default function Header() {
  return (
    <header className="sticky top-0 h-[90px] min-w-full z-[1000] transition-[height] duration-150 bg-white shadow-sm px-6 flex items-center justify-between">
      <h1 className="text-xl font-bold">📦 Product Manager</h1>
      <a
        href="/products/new"
        className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800"
      >
        상품 생성
      </a>
    </header>
  );
}
