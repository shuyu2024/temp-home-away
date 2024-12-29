// 'use client';
// import { Input } from '../ui/input';
// import { useSearchParams, usePathname, useRouter } from 'next/navigation';
// import { useDebouncedCallback } from 'use-debounce';
// import { useState, useEffect } from 'react';

// function NavSearch() {
//   const searchParams = useSearchParams();

//   const pathname = usePathname();
//   const { replace } = useRouter();
//   const [search, setSearch] = useState(
//     searchParams.get('search')?.toString() || ''
//   );
//   const handleSearch = useDebouncedCallback((value: string) => {
//     const params = new URLSearchParams(searchParams);
//     if (value) {
//       params.set('search', value);
//     } else {
//       params.delete('search');
//     }
//     replace(`${pathname}?${params.toString()}`);
//   }, 300);
//   useEffect(() => {
//     if (!searchParams.get('search')) {
//       setSearch('');
//     }
//   }, [searchParams.get('search')]);
//   return (
//     <Input
//       type='search'
//       placeholder='find a property...'
//       className='max-w-xs dark:bg-muted '
//       onChange={(e) => {
//         setSearch(e.target.value);
//         handleSearch(e.target.value);
//       }}
//       value={search}
//     />
//   );
// }
// export default NavSearch;

'use client';

import { Input } from '../ui/input';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState, useEffect, useMemo } from 'react';

function NavSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [search, setSearch] = useState(
    searchParams.get('search')?.toString() || ''
  );

  // Stabilize searchParams for useEffect
  const stableSearchParams = useMemo(() => {
    return new URLSearchParams(searchParams.toString());
  }, [searchParams]);

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(stableSearchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    if (!stableSearchParams.get('search')) {
      setSearch('');
    }
  }, [stableSearchParams]);

  return (
    <Input
      type="search"
      placeholder="find a property..."
      className="max-w-xs dark:bg-muted"
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
      value={search}
    />
  );
}

export default NavSearch;
