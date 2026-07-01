import HelloReact from '@/app/components/HelloReact';

function Layout({ children }) {
  return (

    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <HelloReact />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {children}
      </div>
    </div>


  );
}

export default Layout;